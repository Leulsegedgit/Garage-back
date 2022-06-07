const mysql = require('mysql');

var mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "fpc",
    password: "pass@FPC123",
    database: "garage",
    port:"3306",
    multipleStatements: true
});

mysqlconnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }
    else{
        console.log("connection faild:"+err);
    }
});

module.exports = mysqlconnection;