const express = require('express'), 
jwt = require('jsonwebtoken'),
router = express.Router(),
model = require('./../../model');

router.use('/topics', require('./topics'));
router.use('/questions', require('./questions'));
router.use('/answers', require('./answers'));

router.get('/login', function (req, res) {
 model.login(req.body)
      .then(
        user => {
          if(user){
            res.setHeader('Authentication', jwt.sign({ userID: user.userID, username: user.username }, 
              'MY_SECRET_KEY', { expiresIn: '30m' }));
              res.json({
                success: true,
                userID: user.userID,
                message: 'Authentication successful!'
              });                
          }  
        });
});

router.post('/register', function (req, res) {
 model.register(req.body)
      .then(results => {
          res.send(results);
       });
})

router.post('/updateBlog', function (req, res) {
  model.updateHandler(req.body)
       .then(results => {
           res.send(results);
        });
 })

module.exports = router