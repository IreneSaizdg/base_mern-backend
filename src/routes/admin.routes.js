//IMPORTACIONES
const { Router } = require('express')
const { isAdmin } = require('../controllers/isAdmin.middleware')
const router = Router()





router.get('/dashboard', isAdmin, (req, res) =>{
    res.send('You are an admin en el controlador.')
})





//EXPORTACIONES
module.exports = router