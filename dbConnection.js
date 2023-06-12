const mysql = require('mysql2');

// create pool or connection
exports.pool = mysql.createPool(
    {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'sql-primer'
    }
) .promise()
