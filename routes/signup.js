var express = require('express');
var dbHandler = require('../dbHandler');
var router = express.Router();

router.post('/', async function (req, res, next) {
    if (req.body.IDCheck) {
        var result = await dbHandler.IDCheck(req);
        res.json({ result: result });
		
    } else {
        var result = await dbHandler.signUp(req);
        if (result == 0) {
            console.log('회원가입 성공');
            res.redirect('/');
        } else if (result == 100) {
            console.log('이미 있는 아이디입니다.');
            res.render('signup');
        }
    }
});

router.get('/', function (req, res, next) {
    res.render('signup');
});

module.exports = router;