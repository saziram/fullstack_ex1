const express = require('express'), 
jwt = require('jsonwebtoken'),
router = express.Router(),
model = require('./../../model');

router.get('/login', verifyToken, function (req, res) {
  model.login(req.body)
       .then(
            user => {
              if(user){
                res.json(
                  jwt.sign({ userID: user.userID, username: user.username }, 
                  'MY_SECRET_KEY', { expiresIn: '30m' })
                );
              }  
            });
})

router.post('/register', function (req, res) {
  model.register(req.body)
       .then(results => {
          res.send(results);
       });
})

// Verify Token
function verifyToken (req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

router.use('/questions', require('./questions'));

module.exports = router