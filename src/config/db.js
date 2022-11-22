// get the client
const mysql = require('mysql2');

// create the connection to database
const connectionSync = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

const connectionAsync = connectionSync.promise();


module.exports = connectionAsync;
