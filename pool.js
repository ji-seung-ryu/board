const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'js',
    password: 'q8514199',
    port: 3306,
    database: 'mydatabase',
});


module.exports = pool; 

