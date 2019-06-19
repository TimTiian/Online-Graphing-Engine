var redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600 //3600秒 redis的时间


module.exports = function(io){
    // collaboration sessions
    var collaborations = {};
    // map from socket Id to problem Id
    var socketIdToProblemId = {};
    
    var sessionPath = '/temp_sessions/'; //可以知道村塾地方
    
    io.on('connection', (socket) => {
        //console.log(socket);
        io.to(socket.id).emit('message', 'Hi from server');
        
        var problemId = socket.handshake.query['problemId'];
        socketIdToProblemId[socket.id] = problemId;
        
        // add socket.id to corresponding collaboration session participants
        // if(!(problemId in collaborations)) {   //application server 会发生重新启动，所以不是专业保存数据的地方。保存信息拿回来，不仅查看是否coll有数据
        //     collaborations[problemId] = {
        //         'participants': [] //参与者参与第一题。现在希望后加入要拿到原来的数据，instruction也要拿到
        //     };
        // }
        // collaborations[problemId]['participants'].push(socket.id);
        if(problemId in collaborations){   //有了活跃的session
            collaborations[problemId]['participants'].push(socket.id);
        } else{
            //not in memory, but check if it's in redis
            redisClient.get(sessionPath + problemId, function(data){
              if(data){
                  console.log('session terminated previously, pulling back from redis');
                  collaborations[problemId] = {
                      'participants': [],
                      'cachedInstructions': JSON.parse(data)
                  };
              } else {
                  console.log('creating new session');
                  collaborations[problemId] = {
                      'participants': [],
                      'cachedInstructions': []
                  }
              }
              collaborations[problemId]['participants'].push(socket.id); //异步操作
            });
        }
        
        // respond to client change event
        socket.on('change', (delta) => {
            let problemId = socketIdToProblemId[socket.id];
            console.log('change from client: ' + socketIdToProblemId[socket.id] + ' ' + delta);
            
            if(problemId in collaborations){
                // save instruction to collaborations
                collaborations[problemId]['cachedInstructions'].push(  //向redis 填数据, 数据永远是change， event Tpye
                    ['change', delta, Date.now()]);
                let participants = collaborations[problemId]['participants'];
                
                for(let i = 0; i < participants.length; i++){
                    if(socket.id != participants[i]){
                        io.to(participants[i]).emit('change', delta);
                    }
                }
            }else {
                console.log('Warning: could not find problme Id in collaborations');
            }
        });
        
        socket.on('restoreBuffer', () =>{
            let problemId = socketIdToProblemId[socket.id];
            console.log('restore buffer for problem ' + problemId + ', socket id: ' + socket.id);
            
            if(problemId in collaborations){
                let instructions = collaborations[problemId]['cachedInstructions']; //将57行保存的change拿出来
                
                for(let i = 0; i < instructions.length; i++){   //希望每个人都拿到所有的数据都拿到
                    socket.emit(instructions[i][0], instructions[i][1]);
                }
            } else {
                console.log('no collaboration found for this socket.');
            }
        });
        
        socket.on('disconnect', () => {
            let problemId = socketIdToProblemId[socket.id];
            
            console.log('disconnect problem: ' + problemId);
            
            let foundAndRemoved = false;
            
            if(problemId in collaborations){
                let participants = collaborations[problemId]['participants'];
                let index = participants.indexOf(socket.id);
                
                if(index >= 0){
                    participants.splice(index, 1);
                    foundAndRemoved = true;
                    
                    if(participants.length == 0){
                        console.log('last participant is leaving, saving to redis');
                        let key = sessionPath + problemId;
                        let value = JSON.stringify(collaborations[problemId]['cachedInstructions']);
                        
                        redisClient.set(key, value, redisClient.redisPrint);//set存入
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);//销毁数据
                        
                        delete collaborations[problemId];//完全删除题目消息
                    }//最后一个在线的人，这时候将数据交给redis
                }
            }
            if(!foundAndRemoved){
                console.log('warning: could not find id in collaborations');
            }
        });
    });
}