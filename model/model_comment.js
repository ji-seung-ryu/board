var pool = require('../config/pool');
var total; 

exports.state = async function () {
    var json = {'data' : [ ] }; 
    try {
        const db = await pool.getConnection();
        var [rows, fields] = await db.query('SELECT * FROM commentDb');
        await db.release();
        for (var i = 0; i < rows.length; i++) {
            json['data'].push({ 'num': rows[i].num, 'name': rows[i].name, 'sen': rows[i].sen });
        
        }
		total = rows[rows.length-1].num; 
		
        return new Promise((resolve, reject) => {
            resolve(json);
			
			
        });
    } catch (err) {
        console.log(err);
    }
};

exports.add = async function (req) {
    var val = { 'num': ++total, 'name': req.name, 'sen': req.sen };
    try {
        const db = await pool.getConnection();
        await db.query('INSERT INTO commentDb SET ? ', val);
        await db.release();
        return new Promise((resolve, reject) => {
            resolve(val);
			if (err) reject();
        });
    } catch (err) {
        console.log(err);
    }
};

exports.remove = async function(req){
	var num = req.num;
	try{
		const db = await pool.getConnection();
		await db.query ('DELETE FROM commentDb WHERE num  = ? ', num);
		await db.release();
		return new Promise((resolve,reject)=>{
			resolve();
			if (err) reject(); 
		});
	} catch(err){
		console.log(err); 
	}
}

exports.update = async function(req){
	
	
	var num = req.num;
	var idx = 'updateText'.concat (num);
	var updateText = req[idx]
	console.log (req);
	console.log (idx);
	console.log ('update is ', updateText);
	try{
		const db = await pool.getConnection();
		await db.query('Update commentDb SET sen = ? WHERE num = ?',[ updateText , num]);
		await db.release();
		return new Promise((resolve,reject)=>{
			resolve();
			if (err) reject(); 
		});
	} catch(err){
		console.log(err); 
	}
	
}