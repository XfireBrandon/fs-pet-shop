const express = require('express')
const app = express()
const fs = require('fs')
const PORT = 8001

app.get('/pets', function(req, res) {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    fs.readFile('pets.json', 'utf8', function(err, data) {
        if(err) {
            console.log('error')
        }
        const formattedData = JSON.parse(data)
        res.send(formattedData)

    })
    
})


app.get('/pets/:id', function(req, res) {
    const splitUrl = req.url.split('/');
    const indexValue = splitUrl[splitUrl.length -1];
    const lastIndexValue = JSON.stringify(indexValue);

    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    fs.readFile('pets.json', 'utf8', function(err, data) {
        if(err) {
            console.log('error')
        }
        let petData = JSON.parse(data);
        let sendData = petData[indexValue]
        
        res.send(sendData)
    })
    if(indexValue > lastIndexValue.length - 2) {
        res.status(404);
        res.setHeader('Content-Type', 'text/plain')
        res.end('404 Not Found')
    } else if(indexValue < 0){
        res.status(404);
        res.setHeader('Content-Type', 'text/plain')
        res.end('404 Not Found')

    }

})


app.listen(PORT, function() {
    console.log(`Server running on port: ${PORT}`)
})