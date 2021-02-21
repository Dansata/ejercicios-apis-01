const express = require('express')
const contacts = require('./lista-telefonica')

const app = express()

//Ruta que retorna la lista de contactos "Hardcodeada"
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

const PORT = 3001
app.listen(PORT,() =>{
    console.log (`Server running on http://localhost/${PORT}`)
})