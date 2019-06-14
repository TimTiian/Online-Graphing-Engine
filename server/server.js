const express = require('express'); //require的功能类似import
const app = express(); //express是一个object，是一个函数，可以运行的. app是express的一个实例
const path = require("path");

var http = require('http');
var socketIO = require("socket.io");
var io = socketIO();
var editorSocketService = require("./services/editorSocketService")(io); // 等于var editorSocketServiceFunc = require("./services/editorSocketService");   var editorSocketService = editorSocketSErviceFunc(io);

//connect to MongoDB 
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://oge:oge@cluster0-pgnzw.mongodb.net/problems");

const restRouter = require("./routes/rest.js");

app.use('/api/v1', restRouter);

app.use(express.static(path.join(__dirname, '../public'))); //express是express object的一个member


// app.listen(8080, () => {
//     console.log('App is listing to port 8080');
// }); 修改后代码在下边

const server = http.createServer(app);
io.attach(server);
server.listen(8080);
server.on('listening', () => {
    console.log('App is listing to port 8080');
})

//如果没有任何人处理，作为运行兜底
app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});