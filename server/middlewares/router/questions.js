const router = require('express').Router();

router.get('/', function (req, res) {
  res.send('getAllQuestions');
})

router.get('/getAllQuestions', function (req, res) {
  res.send('getAllQuestions');
})

router.get('/getQuestionByID', function (req, res) {
    res.send('getQuestionByID');
})
  
module.exports = router;