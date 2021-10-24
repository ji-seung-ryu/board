//var getConnection = require ('pool');
var pool = require('./pool');
const mysql = require('mysql2/promise');
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();

exports.login = async function (req) {
    try {
        var json = {};
        json.code = 0;

        var id = req.body.id;
        var pw = req.body.pw;
        
        const db = await pool.getConnection();

        var [rows, fields] = await db.query('SELECT * FROM mytable WHERE id = ?', [id]);
        await db.release();

        if (rows[0]) {
			json.name = rows[0].name; 
            var userSalt = rows[0].salt;
            var userPass = rows[0].pw;
            return new Promise((resolve, reject) => {
                hasher({ password: pw, salt: userSalt }, (err, pass, salt, hash) => {
                    if (hash != userPass) {
                        json.code = 100;
                        json.msg =
                            '패스워드 일치하지 않습니다.(운영환경 : ID 및 비밀번호가 일치하지 않습니다)';
                        json.data = {};
                    } else {
                        json.msg = '로그인 성공!';
                     //   json.data = rows[0];
                    }
                    resolve(json);
                });
            });
        } else {
            json.code = 100;
            json.msg = 'ID 일치하지 않습니다.';
            json.data = {};
			
            return json;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.signUp = async function (req, res) {
    try {
        var resultcode = 0;

        var id = req.body.id;
        var pw = req.body.pw;
        var name = req.body.name;
        const db = await pool.getConnection();

        var [rows, fields] = await db.query('SELECT * FROM mytable WHERE id = ?', [id]);
        await db.release();

        if (rows[0] == undefined) {
            hasher({ password: pw }, async (err, pass, salt, hash) => {
                var user = {
                    id: id,
                    pw: hash,
                    name: name,
                    salt: salt,
                };
                var rows = await db.query('INSERT INTO mytable SET ?', user);
            });
        } else {
            resultcode = 100;
        }

        return resultcode;
    } catch (err) {
        console.log(err);
    }
};

exports.IDCheck = async function (req, res){
	try{
		var resultcode = 0; 
		var id = req.body.id;
		const db = await pool.getConnection();
		var [rows , fields] = await db.query('SELECT * FROM mytable WHERE id = ?', [id]);
		await db.release();
		
		if (rows[0] !== undefined) resultcode = 100;
		return resultcode;
	}
	catch(err){
		console.log(err); 
	}
}