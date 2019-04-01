const router = require('express').Router(), 
model = require('./../../model');

router.get('/', function (req, res) {
  res.send('getAllQuestions');
})

router.get('/getQuestionByID', function (req, res) {
    res.send('getQuestionByID');
})
  
module.exports = router;