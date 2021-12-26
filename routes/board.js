var express = require('express');
var model_comment = require ('../model/model_comment');
var url = require('url');
var router = express.Router();
/* GET home page. */

router.get('/', async function(req, res, next) {
	
	var state = await model_comment.state(); 

	state['user'] = req.session.info.name; 

	res.render('board', state); 
});

router.post('/', async function (req, res, next) {


	// remove 
	
	if (req.body.isLogout) {
		res.redirect("/");	
		return;
	}
	else if (req.body.isAdd ) await model_comment.add(req.body);
	else if (req.body.isRemove) await model_comment.remove(req.body);
	else if (req.body.isUpdate) await model_comment.update(req.body);
	
	var state = await model_comment.state();
	state['user'] = req.body.name; 
	
	res.render('board', state);
	
	
});



module.exports = router;
