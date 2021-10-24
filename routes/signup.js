var express = require('express');
var dbHandler = require('/workspace/20210724/dbHandler');
var router = express.Router();

router.post('/', async function (req, res, next) {
	var result = await dbHandler.signUp(req);
	if (result == 0) {
		console.log ("회원가입 성공");
		res.redirect("/");
	}
	else if (result == 100){
		console.log ("이미 있는 아이디입니다.");
		 res.render('signup');
	} 
});
	
			

router.get('/', function (req, res, next) {
    res.render('signup');
});

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
module.exports = router;