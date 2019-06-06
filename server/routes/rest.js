const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");//前端向后端传递数据，json格式传到后端需要被识别
const jsonParser = bodyParser.json();

const problemService = require('../services./problemService');

router.get('/problems', (req, res) => {
    //get all problem
    problemService.getProblems()
        .then((problems) =>{
            res.json(problems); //拿到题目后，将输出发出到response
        });
});

router.get('/problems/:id', (req, res) => {
    //get single problem
    const id = req.params.id;
    problemService.getProblem(+id)
        .then((problem) => {
            res.json(problem);
        });
});

router.post('/problems', jsonParser, (req, res) => { //进入的请求先被jsonParser处理，jsonParser的输出给request
    // add a problem
    problemService.addProblem(req.body)
        .then(problem => {
            res.json(problem);
        }, error => {
            res.status(400).send('problem name already exists!');
        });
});

module.exports = router;