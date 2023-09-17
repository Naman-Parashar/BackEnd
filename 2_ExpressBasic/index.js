const express = require('express');
const port = 8000;
const app = express();


// we get the page grom get functon
app.get('/', function(req, res){
    res.send('<H1>cool server is available</H1>');
});

// here express server is listning.
app.listen(port , function(err){
    if(err) {
        console.log('Error in running the server',err);
    }
    console.log('Express server is running on port :: ',port);
});

