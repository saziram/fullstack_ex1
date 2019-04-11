const jwt = require('jsonwebtoken');

// Verify Token
module.exports = function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    process.env.USER_ID = req.headers['userid'];
    console.log('entered');
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(bearerToken, 'MY_SECRET_KEY', function(err, decoded) {
        //if(req.url === '/login') res.json({}); 
        if(decoded){
          process.env.USER_DATA = decoded;
          next();
        }else{
          res.json(err);
        } 
      });        
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}