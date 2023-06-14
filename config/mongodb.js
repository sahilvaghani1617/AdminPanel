const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/admindata",)

const db = mongoose.connection;

db.on('error',console.error.bind('error',console));

db.once('open', function(err){
    if(err){
        console.log("Db is not connected");
        return false;
    }
    console.log("Db is connected");
})

module.exports = db;