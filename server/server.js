const express = require('express')
const cors = require('cors')
const fs = require('fs');
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express();

let urlParser = bodyParser.urlencoded({ extended: false })

let port;

app.use(express.json())
app.use(morgan('common'))
app.use(cors())
app.use(bodyParser.json({ type: 'application/*+json'}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization', '*')
    next()
})

let users = [
    {id: 1, name: 'default'}
]


app.get('/', (req, res, next) => {
    res.status(200).send({message: "This is the homepage of my API, Hello there"})
})


app.get('/users/:name', (req, res) => {
    let selected = null
    console.log("here i amm")
    users.forEach(user => {
        if(user.name === req.params.name)
            selected = user
    })

    console.log(`requested user: ${req.params.name}`)

    if(selected === null)
        res.status(404).json({message: 'The user was not found', name: req.params.name})

    res.status(200).json({message: 'The user is found', user: selected})
})

app.get('/users', (req, res, next) => {
    res.status(200).send(users)
})


app.post('/users/:name', (req, res) => {
    let check = false 
    const urlName = req.params.name 
    users.forEach(user => {
        if(user.name === urlName.trim())
            check = true
    })

    if(check)
        res.status(400).json({message: 'user is already created', name: urlName})
    else {
        let id;
        do{
            check = false
            id = Math.floor(Math.random() * 100) + 1 
            users.forEach(user => {
                if(user.id === id)
                    check = true
            }) 
        } while(check)

        let user = {
            name: urlName,
            id: id
        }

        users.push(user)
        res.status(201).json({message: 'User was successfully created', user: user})
    }
})

function init(){
    const jsonPort = JSON.parse(fs.readFileSync('../ProgramData/data.json'))

    port = process.env.PORT || jsonPort['network']['port']
}

init()

app.listen(port, () => {
    console.log(`Listening on port ${port}.....`)
})
