const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/codeial");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connection to the Database"));

db.once('open',function(){
    console.log("Connected to the Database");
})

module.exports = db;