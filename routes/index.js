var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* API */

router.get('/', function(req, res) {
	res.send('GET: host/api')
});

module.exports = router;
