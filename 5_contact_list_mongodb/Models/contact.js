// define a single contact schema
const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

// now name of collection ie "ContactBackend"
const Contact = mongoose.model('ContactBackend', ContactSchema);
module.exports = Contact;