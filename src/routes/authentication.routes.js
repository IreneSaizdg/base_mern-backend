// IMPORTACIONES
const { Router } = require('express')
const router = Router()
const { login, register, renewToken } = require('../controllers/authentication.controllers')



// Autentificación
    // LOGIN 
    // POST: http://localhost:3000/api/v1/auth/login
    router.post('/login', [], login) //URL y función controladora (VALIDAR)


    // REGISTER 
    // POST: http://localhost:3000/api/v1/auth/register
    router.post('/register', [], register) //URL y función controladora (VALIDAR)


    // RENEWTOKEN
    // GET: http://localhost:3000/api/v1/auth/renew
    router.get('/renew', [], renewToken) //URL y función controladora (VALIDAR)










// EXPORTACIONES
module.exports = router