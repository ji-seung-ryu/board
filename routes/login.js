var express = require('express');
var model_id_pw = require('../model/model_id_pw');
var router = express.Router();

router.post('/', async function (req, res, next) {
   
    if (req.body.isLogin) {
        console.log('login');
        var result = await model_id_pw.login(req);
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