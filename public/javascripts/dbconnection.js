var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    port:'3306',
    database:'mydb'
});

connection.connect(function (err) {
    if(!err){
        console.log("Database is connected..\n");
    }else{
        console.log("Error connectino database..\n");
    }
});

module.exports = connection;