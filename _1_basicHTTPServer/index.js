/* 
Step 1: Go to that folder. and run npm init. it create package.json file
 */

const http = require('http');
const port  = 8000;

const server = http.createServer(requestHandler);

server.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log('listening on port',port);
}); 

// return html files using cases
const fs = require('fs');  

function requestHandler(req, responce){
    console.log(req.url);
    responce.writeHead(200, {'content-type':'text/html'});
    
    let filePath;

    switch(req.url){
        case '/':
            filePath = './index.html';
            break;
        case '/profile':
            filePath = './profile.html';
            break;
        default:
            filePath = "./404.html";
    }


    fs.readFile(filePath , function(err, data){
        if (err) {
            console.log(err);
            return;
        }
        return responce.end(data);
    });
}