const express = require("express");
const app = express();
const fs = require('fs')
const port = 8002

const {Pool} = require('pg')

app.use(express.json());

const pool = new Pool({
    user: 'brandonmartin',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'pet_shop'
});

app.get('/pets', async (req, res) => {
    try {
        let {rows} = await pool.query('SELECT * FROM pets');
        res.status(200).send(rows)
    } catch (err) {
        res.status(404).send(err.message);
    };
})

app.get('/pets/:id', async (req, res) => {
    const {id} = req.params
    try {
        let {rows} = await pool.query('SELECT * FROM pets WHERE id = $1;', [id]);
        res.status(200).send(rows)
    } catch (err) {
        res.status(404).send(err.message);
    };
})

app.post('/pets', async (req, res) => {
    const {age, kind, name} = req.body
    try {
        let {rows} = await pool.query('INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3)', [age, kind, name])
        res.status(200).send(rows)
    } catch (err) {
        res.status(404).send(err.message);
    }
});

app.patch('/pets/:id', async (req, res) => {
    const {id} = req.params
    const {age, kind, name} = req.body

    try {
        let {rows} = await pool.query('UPDATE pets SET name = $1, kind = $2, age = $3  WHERE id = $4', [name, kind, age, id])
        res.status(200).send(rows)
    } catch (err){
        res.status(404).send(err.message)
    }
});

app.delete('/pets/:id', async (req, res) => {
    const {id} = req.params
    try {
        let {rows} = await pool.query('DELETE FROM pets WHERE id = $1', [id]);
        res.status(200).send(rows)
    } catch (err) {
        res.status(404).send(err.message)
    }
})


// app.post('/pets', (req, res) => {
//     const body = req.body
//     fs.readFile('pets.json', 'utf8', (err, data) => {
//         if(err) throw err;

//         const petData = JSON.parse(data);
//         petData.push(body);
//         const JSONpet = JSON.stringify(petData)
//         res.status(200)

//         res.send(req.body)
//         fs.writeFile('pets.json', JSONpet, (err) => {
//             if(err) throw err;
//         })
//     })

// })

// app.patch('/pets/:id', (req, res) => {
//     const id = req.params.id
//     const addData = req.body
//     fs.readFile('./pets.json', 'utf8', (err, data) => {
//         if(err) throw err;
//         const parseData = JSON.parse(data)
//         const obj = parseData[id]
//         obj.name = addData.name
//         const strData = JSON.stringify(parseData)

//         fs.writeFile('pets.json', strData, (err) => {
//             if(err) throw err;
//             res.send(obj)
//         })
//     })
// })


// app.delete('/pets/:id', (req, res) => {
//     const id = req.params.id;
//     fs.readFile('./pets.json', 'utf-8', (err, data) => {
//       let parsedData = JSON.parse(data);
//       parsedData.splice(id, 1)
//       let JSONdata = JSON.stringify(parsedData)
//       fs.writeFile('./pets.json', JSONdata, 'utf-8', (err) => {
//         console.error(err)
//         res.send(parsedData)
//       })
//     })
//   })


app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})