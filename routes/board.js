var express = require('express');
var comment = require ('../comment');
var url = require('url');
var router = express.Router();
/* GET home page. */

router.get('/', async function(req, res, next) {
	
	var state = await comment.state(); 

	state['user'] = req.session.info.name; 

	res.render('board', state); 
});

router.post('/', async function (req, res, next) {


	// remove 
	
	if (req.body.isLogout) {
		res.redirect("/");	
		return;
	}
	else if (req.body.isAdd ) await comment.add(req.body);
	else if (req.body.isRemove) await comment.remove(req.body);
	else if (req.body.isUpdate) await comment.update(req.body);
	
	var state = await comment.state();
	state['user'] = req.body.name; 
	
	res.render('board', state);
	
	
});



module.exports = router;
