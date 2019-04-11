const router = require('express').Router(), 
model = require('./../../model'),
tokenVerify = require('./../tokenVerify');

router.get(['/', '/getAllQuestions', '/getQuestionsByID/:questionsID'], function (req, res) {
    if(req.params && req.params.questionsID){
        var cond = {
          questionsID : req.params.questionsID
        }
    }
    model.getQuestions(cond || {})
    .then(
    results => {
        res.json(results); 
    });      
});

router.post('/createNewQuestion', tokenVerify, function (req, res) {
    model.createNewQuestion(req.body)
    .then(
      results => {
        res.json(results);   
      });  
});

module.exports = router;