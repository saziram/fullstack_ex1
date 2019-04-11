const express = require('express'), 
jwt = require('jsonwebtoken'),
router = express.Router(),
model = require('./../../model');

router.use('/topics', require('./topics'));
router.use('/questions', require('./questions'));
router.use('/answers', require('./answers'));

router.post('/login', function (req, res) {
 model.login(req.body)
      .then(
        user => {
          if(user.errMsg) throw user.errMsg;
              res.json({
                success: true,
                userID: user.userID,
                message: 'Authentication successful!',
                token: jwt.sign({ userID: user.userID, username: user.username }, 'MY_SECRET_KEY', { expiresIn: '30m' })
              });                            
        })
        .catch(
          err =>  res.json({
            errCode: "402",
            errMsg: err
          })
        );
});

router.post('/register', function (req, res) {
 model.register(req.body)
      .then(
        user => {
          if(user.errMsg) throw user.errMsg;
              res.json({
                success: true,
                userID: user.userID,
                message: 'Registration successful!',
                token: jwt.sign({ userID: user.userID, username: user.username }, 'MY_SECRET_KEY', { expiresIn: '30m' })
              });     
        })
        .catch(
          err =>  res.json({
            errCode: "402",
            errMsg: err
          })
        );
})

router.post('/updateBlog', function (req, res) {
  model.updateHandler(req.body)
       .then(results => {
           res.send(results);
        })
       .catch(
         err =>  res.json(err)
       );
 })

module.exports = router