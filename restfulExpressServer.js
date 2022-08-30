const express = require("express");
const app = express();
const fs = require('fs')
const port = 8002


app.use(express.json());

app.post('/pets', (req, res) => {
    const body = req.body
    fs.readFile('pets.json', 'utf8', (err, data) => {
        if(err) throw err;

        const petData = JSON.parse(data);
        petData.push(body);
        const JSONpet = JSON.stringify(petData)
        res.status(200)

        res.send(req.body)
        fs.writeFile('pets.json', JSONpet, (err) => {
            if(err) throw err;
        })
    })

})

app.patch('/pets/:id', (req, res) => {
    const id = req.params.id
    const addData = req.body
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        if(err) throw err;
        const parseData = JSON.parse(data)
        const obj = parseData[id]
        obj.name = addData.name
        const strData = JSON.stringify(parseData)

        fs.writeFile('pets.json', strData, (err) => {
            if(err) throw err;
            res.send(obj)
        })
    })
})


app.delete('/pets/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
      let parsedData = JSON.parse(data);
      parsedData.splice(id, 1)
      let JSONdata = JSON.stringify(parsedData)
      fs.writeFile('./pets.json', JSONdata, 'utf-8', (err) => {
        console.error(err)
        res.send(parsedData)
      })
    })
  })


app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})