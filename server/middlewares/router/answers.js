const router = require('express').Router(), 
model = require('./../../model'),
tokenVerify = require('./../tokenVerify');

router.get(['/', '/getAllAnswers', '/getAnswersByID/:answersID'], tokenVerify, function (req, res) {
    if(req.params && req.params.questionsID){
        var cond = {
          questionsID : req.params.questionsID
        }
    }
    model.getAnswers(cond || {})
    .then(
    results => {
        res.json(results); 
    });      
});

router.post('/createNewAnswer', tokenVerify, function (req, res) {
    model.createNewAnswer(req.body)
    .then(
      results => {
        res.json(results);   
      });  
});

module.exports = router;