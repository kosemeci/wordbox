const mysql=require("mysql2");
const config = require("../config");


let connection = mysql.createConnection(config.db);

connection.connect(function(err){
    if(err){
        console.log("Bağlantı da sorun var "+err);
    }
    else{
        console.log("Bağlantı başarılı")
    }
})

module.exports = connection.promise();