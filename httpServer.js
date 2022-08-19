const http = require('http');
const fs = require('fs');

const server = http.createServer();
const port = 8001

server.on('request',function(req, res) {

    if(req.url === '/pets') {
        res.status = 200
        res.setHeader('Content-Type', 'application/json')
        fs.readFile('pets.json', 'utf8', function(err, data) {
            if(err){
                console.log('There was an error')
            }  
            res.end(data)
        })
        
        
    }
    const splitUrl = req.url.split('/');
    const indexValue = splitUrl[splitUrl.length -1];
    const lastIndexValue = JSON.stringify(indexValue);

    if(req.url === `/pets/${indexValue}`){
        res.status = 200;
        res.setHeader('Content-Type', 'application/json')

    fs.readFile('pets.json', 'utf-8', function(err, data) {
            if(err){
                console.log('There was an error');
            }
            let petData = JSON.parse(data);
            let sendData = petData[indexValue]

            // res.end(JSON.stringify(petData[lastIndexValue]));
            res.end(JSON.stringify(sendData))

        })
        if(indexValue > lastIndexValue.length - 2) {
            res.status = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('404 Not Found')
        } else if(indexValue < 0){
            res.status = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('404 Not Found')

        }

    }


        
})



server.listen(port, function() {
    console.log(`Listening on port: ${port}`)
})


// fs.readFile('pets.json', 'utf8', function(err, data) {
//     if(err){
//         console.log('There was an error')
//     }
// })
