const { Router } = require('express')
const router = new Router()

router.get('/ruta', (req, res) => {
    res.json({ response : 'La respuestica'})
})
module.exports = router