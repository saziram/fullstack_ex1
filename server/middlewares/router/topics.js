const router = require('express').Router(), 
model = require('./../../model'),
tokenVerify = require('./../tokenVerify');

router.get(['/', '/getAllTopics', '/getTopicByID/:topicID'], tokenVerify, function (req, res) {
    if(req.params && req.params.topicID){
        var cond = {
            topicID : req.params.topicID
        }
    }
    model.getTopics(cond || {})
    .then(
    results => {
        res.json(results); 
    });      
});

router.post('/createNewTopic', tokenVerify, function (req, res) {
    model.createNewTopic(req.body)
    .then(
      results => {
        res.json(results);   
      });  
});

module.exports = router;