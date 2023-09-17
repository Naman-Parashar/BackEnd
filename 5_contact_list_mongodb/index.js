const express = require('express');
const path = require('path');
const port = 8000;

// meed db file
const db = require('./config/mongoose');

// requiring models Schema
const ContactFromModels = require('./Models/contact');
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
        name: "John",
        phone:"11111111111"
    },
    {
        name: "tony",
        phone:"222222222222"
    },
    {
        name: "hulk",
        phone:"333333333333"
    }
]; 


app.post('/create-contact', function(req, res){
    const createdContact =   ContactFromModels.create({
        name: req.body.name,
        phone: req.body.phone
     }).then(function(newContact){
        console.log("******", newContact);
     }).catch(function(err){
        console.log("There is an error :: ",err);
     });

     return res.redirect('back');
});

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


app.listen(port,function(err){
    if(err) { console.log(err); }
    console.log("Express Server For Contact list started at port ::", port);
})