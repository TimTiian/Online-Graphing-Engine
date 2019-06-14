module.exports = function(io){
    // collaboration sessions
    var collaborations = {};
    // map from socket Id to problem Id
    var socketIdToProblemId = {};
    
    io.on('connection', (socket) => {
        //console.log(socket);
        io.to(socket.id).emit('message', 'Hi from server');
        
        var problemId = socket.handshake.query['problemId'];
        socketIdToProblemId[socket.id] = problemId;
        
        // add socket.id to corresponding collaboration session participants
        if(!(problemId in collaborations)) {
            collaborations[problemId] = {
                'participants': []
            };
        }
        collaborations[problemId]['participants'].push(socket.id);
        
        // respond to client change event
        socket.on('change', (delta) => {
            let problemId = socketIdToProblemId[socket.id];
            console.log('change from client: ' + socketIdToProblemId[socket.id] + ' ' + delta);
            
            if(problemId in collaborations){
                let participants = collaborations[problemId]['participants'];
                
                for(let i = 0; i < participants.length; i++){
                    io.to(participants[i]).emit('change', delta);
                }
            }else {
                console.log('Warning: could not find problme Id in collaborations');
            }
        });
    });
}