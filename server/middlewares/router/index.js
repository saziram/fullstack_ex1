const express = require('express') , router = express.Router();

router.use('/questions', require('./questions'));

module.exports = router