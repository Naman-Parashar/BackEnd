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

app.get('/', function(req, res){
    // first featch contact
    ContactFromModels.find({})
    .then(function(contacts){
        return res.render('home', {
            title : 'My Contact List',
            contact_list : contacts
        });
    })
    .catch(function( err){
        if(err){
            console.log('Error');
            return;
        }});
        
});


app.get('/delete-contact/:id', function(req, res){
    // get the id from the params
    let id = req.params.id;
    // find the contact in the database and delete it
    ContactFromModels.findByIdAndDelete(id)
    .then(function(contact) {
        console.log(contact,'successfully deleted the contact with id :: ', id);
        return res.redirect('back');
    }).catch(function(err) {
        console.error('error deleting contact');
        return;
    });

});

app.listen(port,function(err){
    if(err) { console.log(err); }
    console.log("Express Server For Contact list started at port ::", port);
})