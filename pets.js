var fs = require('fs')

let command = process.argv[2]


if (!process.argv[2]) {
    const message = 'Please enter a command'
     console.log(`${message}... Usage: node pets.js [read | create | update | destroy]`)
  
}

if (command === 'read' && !index) {
    fs.readFile('pets.json', 'utf8', function(error, data){
        if(error) {
            console.log('error')
            process.exit(1)
        }
        let formattedData = JSON.parse(data)
        console.log(formattedData)
    })
} else if(command === 'read' && index) {
    let index = process.argv[3]
    fs.readFile('pets.json', 'utf8', function(error, data){
    if(error) {
        console.log('error')
        process.exit(1)
     }

    let formattedData = JSON.parse(data)
    if(index >= formattedData.length || index < 0) {
        console.log('out of bounds')
    } else {
        console.log(formattedData[index])
    }
})
}



if(command === 'create') {
    fs.readFile('pets.json', `utf8`, function(error, data){
        if(error) return console.error(error)

        let age = parseInt(process.argv[3])
        let kind = process.argv[4]
        let name = process.argv[5]

        let createCommand = { age, kind, name}

        const parseData = JSON.parse(data)
        console.log(parseData)
        parseData.push(createCommand)

        const JSONcreate = JSON.stringify(parseData)

        if(!age || !kind || !name) {
            console.log('Need AGE KIND NAME')
        } else {
            fs.writeFile('./pets.JSON', JSONcreate, function(error) {
                if (error) return error
            })
        }
    })
    console.log("Usage: node pets.js create AGE KIND NAME")
}
    

// } else {
//    fs.readFile('pets.json', 'utf8', function(error, data) {
//         if(error){
//             console.log(error)
//         } else {
//            let  formattedData = JSON.parse(data)
//             console.log(formattedData)
//         }
//     })
// }

// if(!process.argv[2]) {
//     const message = 'Please enter a command'
//     console.log(`${message}... Usage: node pets.js [read | create | update | destroy]`)
// }

// const command = process.argv[2]
// const index = process.argv[3]

// if(command === 'read' && !index) {
//     fs.readFile('pets.json', 'utf8', function(error, data) {
//         if(error){
//             console.log('error')
//             process.exit(1)
//         } 

//         let formattedData = JSON.parse(data)
//         console.log(formattedData)
//     })
// } else if (command === 'read' && index) {
    // fs.readFile('pets.json', 'utf8', function(error, data) {
    //     if(error){
    //         console.log('error')
    //         process.exit(1)
    //     }

    //     let formattedData = JSON.parse(data)
    //     console.log(formattedData[index])
// })


