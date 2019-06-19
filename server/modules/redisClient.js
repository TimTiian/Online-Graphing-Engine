var redis = require('redis'); //require 是引入redis的client，var后边的redis是server
var client = redis.createClient();

function set(key, value, callback){  //对数据库引入数据set
    client.set(key, value, function(err, res){
        if(err){
            console.log(err);
            return;
        }
        callback(res);
    });
}  

function get(key, callback){
    client.get(key, function(err, res){
        if(err){
            console.log(err);
            return;
        }
        
        callback(res);
    });
}

function expire(key, timeInSeconds) { //保存内容有时间限制
    client.expire(key, timeInSeconds);
}

function quit(){
    client.quit();
}

module.exports = {
    get: get,  //可以直接写为get
    set: set,
    expire: expire,
    quit: quit,
    redisPrint: redis.print
}