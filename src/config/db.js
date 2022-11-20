// get the client
const mysql = require('mysql2');

// create the connection to database
const connectionSync = mysql.createConnection({
    host: process.env.DB_HOST || localhost,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE || servyar,
    user: process.env.DB_USERNAME || root,
    password: process.env.DB_PASSWORD || "",
});

const connectionAsync = connectionSync.promise();

module.exports = connectionAsync;
