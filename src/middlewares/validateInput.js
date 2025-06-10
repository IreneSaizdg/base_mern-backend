const { validationResult } = require('express-validator') //ValidationResult es un método desestructurado de expressValidator

const validateInput = (req, res, next) => {
    const errors = validationResult(req) //Guarda en una constante el objeto de errores pasando como parámetro el req
    console.log(errors)
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false, 
            errores: errores.mapped()
        })
    }
    next() // Ejecuta el createProduct (la siguiente función)
}

module.exports = {
    validateInput
}