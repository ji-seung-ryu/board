var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log ('get'); 
	res.render('index', { title: 'express' });
});

router.post('/', function (req,res,next){
	
	console.log(req.body); 
	res.json({ok: true})
});

module.exports = router;
