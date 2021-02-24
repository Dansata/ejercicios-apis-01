const express = require('express')
const contacts = require('./lista-telefonica')
const morgan = require('morgan')

const app = express()
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
/*
app.use(express.json())
app.post('/api/persons/', (req, res) =>{
    const newContact = {
        ...req.body
     id : Math.floor(Math.random()*1000),     
    }

    const totalContacts = contacts.concat(newContact)
    res.status(201).json(newContact)
    if{}

    
})
*/



const PORT = 3001
app.listen(PORT,() =>{
    console.log (`Server running on http://localhost/${PORT}`)
})