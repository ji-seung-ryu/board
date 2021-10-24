var express = require('express');
var dbHandler = require('/workspace/20210724/dbHandler');
var router = express.Router();

router.post('/', async function (req, res, next) {
    console.log('post');
    console.log(req.body);
    if (req.body.isLogin) {
        console.log('login');
        var result = await dbHandler.login(req);
        req.session.info = result;
        if (result.code == 0) {
            res.redirect('/board');
        } else res.render('login');
    } else if (req.body.IDCheck) {
        console.log('check');
        var result = await dbHandler.IDCheck(req);
        
        res.json({"result" : result});
        //f (result == 0) res.send ('you can use it!');
        //lse res.send ('duplicated id, need to change' )
    }
});

router.get('/', function (req, res, next) {
    res.render('login');
});

module.exports = router;