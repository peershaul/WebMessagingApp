const express = require('express')
const cors = require('cors')
const fs = require('fs');
const morgan = require('morgan')
const bodyParser = require('body-parser')

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

app.get('/users', (req, res, next) => {
    res.status(200).send(users)
})

app.get('/users/:id', (req, res, next) => {
    let respUser = null
    users.forEach(user => {
        if(user.id === Number(req.params.id))
            respUser = user 
    })

    if(respUser == null)
        res.status(404).json({message: 'user not found', id: req.params.id, status: 404})
    else 
        res.status(200).json(respUser)
})


app.post('/users', urlParser, (req, res, next) => {
    let body = req.body;
    if(!body.name)
        res.status(400).json({message: 'Name attribute does not found'})

    let check = false;
    let object = null
    users.forEach(user => {
        if(user.name === body.name){
            check = true;
            object = user 
        }
    })

    if(check)
        res.status(200).json({message: 'Already found', body: body, user: object})

    else
    {
        let id;
        do
        {
            check = false
            id = Math.floor(Math.random() * 100) + 1
            users.forEach(user => {
                if(user.id === id)
                    check = true
            })
        } while (check)



        let newUser = {
            name: body.name,
            id : id
        }
        users.push(newUser)
        res.status(200).json({message: 'Every thing is ok', body: body, user: newUser})
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
