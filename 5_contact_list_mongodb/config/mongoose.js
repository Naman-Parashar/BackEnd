const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/contact_list_db2');

// verify if it is connected or not.
const db = mongoose.connection;

// if error then this will run
db.on('error',console.error.bind(console,'error'));

// if connection is successfull
db.once('open',function(){
    console.log('** connected with data base **');
});