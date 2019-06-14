const mongoose = require("mongoose"); //用require命令引入mongoose
const problemSchema = mongoose.Schema({ // Schema是数据属性模型
    id: Number,
    name: String,
    desc: String,
    difficulty: String
});

const ProblemModel = mongoose.model('ProblemModel', problemSchema); //model具有对数据库操作的行为
module.exports = ProblemModel;  //module.exports才是模块公开的接口