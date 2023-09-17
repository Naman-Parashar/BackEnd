const express = require('express');
const path = require('path');
const port = 8000;

// meed db file
const db = require('./config/mongoose');

// requiring models Schema
const Contact = require('./Models/contact');
// call express
const app = express();

// setting view engines
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));

// using 2 middlewares
app.use(express.urlencoded());
app.use(express.static('Assets')); 

var contactList = [
    {
        name: "Naman",
        phone:"11111111111"
    },
    {
        name: "Sangam",
        phone:"222222222222"
    },
    {
        name: "Shivansh",
        phone:"333333333333"
    }
]; 
app.get('/',function(req,res){
    return res.render('home',{
        title:"Contact List",
        contact_list:contactList
    })
});

app.get('/delete-contact/:phone', function(req, res){
    let phone = req.params.phone;
    let contactIndex = contactList.findIndex(contact=> contact.phone == phone);
    if (contactIndex != -1){
        contactList.splice(contactIndex, 1); 
    }
    return res.redirect('back');
});

app.post('/create-contact', function(req, res){
    contactList.push(req.body);
    return res.redirect('back'); 
});

app.listen(port,function(err){
    if(err) { console.log(err); }
    console.log("Express Server For Contact list started at port ::", port);
})