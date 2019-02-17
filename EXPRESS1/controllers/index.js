var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { titol: 'Express 4.0' });
});

router.get('/suma', function(req, res, next) {
  res.render('suma', { titol: 'suma de 2 nombres' });
});

module.exports = router;
