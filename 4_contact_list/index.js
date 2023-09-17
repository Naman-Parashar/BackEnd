const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));

// to use req.body as req is encoded when data is send from form so we need a parser to convert it ito object,
// like    
/* 
   req: {
         ......
         body:{
            name:"sdbbhf",
            phone:13243,
            .....
         },
         ......
   }
*/
app.use(express.urlencoded());

app.use(express.static('Assets'));  // to access static files


// an array of objects
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





app.get('/',function(req,res){
    return res.render('home',{
        title:"Contact List",
        contact_list:contactList
    })
});

app.post('/create-contact', function(req, res){
    // console.log(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    contactList.push(req.body);
    return res.redirect('back'); // return to where we come from
});

app.get('/delete-contact/:phone', function(req, res){
    // console.log(req.params);
    let phone = req.params.phone;

    let contactIndex = contactList.findIndex(contact=> contact.phone == phone);
    // console.log(contactIndex);

    if (contactIndex != -1){
        contactList.splice(contactIndex, 1); // remove only  contactIndex if i put 2 then remeove 2 contac from contactIndex
    }

    return res.redirect('back'); // return to where we came from
});

app.listen(port,function(err){
    if(err) { console.log(err); }
    console.log("Express Server For Contact list started at port ::", port);
})