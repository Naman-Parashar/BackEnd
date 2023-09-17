const express = require('express');
// path required to set folder for views.
const path = require('path');
const port = 8000;
const app = express();

// setting our view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views')); // __dirname will return the full directory path ie d/backend/ejs/... and join
                                                    // views at last (d/backend/ejs/views) we can also hard code it.

app.get('/', function(req, res){
    // render() we return bcz it may happen that it search for next thing so it's better to return
    //todo ::  return res.render('home'); 

    // let say we want to make our title dynamic we can simply
    return res.render('home', {title : 'Dynamic Title'});
});

app.get('/practic', function(req, res){
    return res.render('practic', {title : 'Dynamic Title for practic'});
});
app.listen(port , function(err){
    if(err) {
        console.log('Error in running the server',err);
    }
    console.log('Express server is running on port :: ',port);
});

