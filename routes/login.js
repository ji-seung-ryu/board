var express = require('express');
var dbHandler = require('../dbHandler');
var router = express.Router();

router.post('/', async function (req, res, next) {
   
    if (req.body.isLogin) {
        console.log('login');
        var result = await dbHandler.login(req);
        req.session.info = result;
        if (result.code == 0) {
            res.redirect('/board');
        } else res.render('login');
    } 
});

router.get('/', function (req, res, next) {
    res.render('login');
});

module.exports = router;