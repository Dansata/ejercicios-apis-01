const express = require('express')
const contacts = require('./lista-telefonica')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
//Ruta 1.7

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :theReturn'))
morgan.token('theReturn', (req) => {
    return JSON.stringify(req.body)
})


//Ruta 1.1
app.get('/api/persons', (req, res) =>{
    if(contacts){
        res.json(contacts)
    }else{
        res.status(404).end
    }
})


//Ruta 1.2
app.get('/info', (req, res) =>{
    if (contacts){
        
        res.send(`Phonebook has info for ${contacts.length}
        <br>
        ${new Date()}
        `)
    }
})

//Ruta 1.3
app.get ('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    console.log(id)
    const contact = contacts.find( contact => contact.id === id)
    if (contact){
        res.json(contact)
    }else{
        res.status(404).end()
    }
})

//Ruta 1.4
app.delete('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    const filteredContacts = contacts.filter( item => item.id != id)
    if(filteredContacts.length != contacts.length){
        res.json(filteredContacts)
    }else{
        res.status(404).end()
    }
})

//Ruta 1.5

app.use(express.json())
app.post('/api/persons/', (req, res) =>{
    const newContact = {
        ...req.body,
        id : Math.round(Math.random()*99999)
    }
    console.log(newContact['name'])
    if (newContact['name'] === '') {
        const errorName = { error: 'name must be filled' }
        res.status(400).json(errorName)
    }if (newContact['name'] === contacts['name']) {
        const errorName = { error: 'name must be different' }
        res.status(400).json(errorName)
    } else {
        console.log(newContact)
        res.status(201).end()
    }
    
})
//



const PORT = process.env.PORT || 3001
app.listen(PORT,() =>{
    console.log (`Server running on http://localhost/${PORT}`)
})