//REQUIRES 1º terceros y luego propios -> EXPORTACIONES al final

// EXPRESS VALIDATOR requerimiento
const { check } = require('express-validator')
const { validateInput } = require('../middlewares/validateInput')


/* ROUTING
    https://github.com/Hector-Tello-The-bridge/fs_ft_abril_25/blob/main/03-node.js/3.3-Introduccion-a-express.md

*/

// EJEMPLO BASE
const express = require("express");   //Importar express en rutas.js
const router = express.Router();      //Llamar a la clase router de express. No hace falta new, pero es una iteración de la clase Router.

router.get('/',(req, res)=>{         //Crear la ruta base. Usa el método get de la clase router.
    res.rener('<h1>dRuta index</h1>'); //Es una función manejadora del evento.
}) 

module.exports=router;              //PONER AL FINALExportar el objeto router para que pueda ser utilizado en otros archivos. 





// LLAMADA A CONTROLADORES:
// Desestructuración de const controladores y aplicación en rutas
const {
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    updateProductById,
    deleteProductById
} = require('../controllers/public.controllers')






/* RUTAS rutas
Cada ruta contiene como mínimo 4 rutas: get, add, update, delete... 
    Se hacen directamente en routes.*/

    /* Ruta productos
        router.get('/servicios',(req, res)=>{         //Crear la ruta servicios
            res.render('<h1>Ruta servicios</h1>');
    }) */

// Ruta productos (x6 rutas con métodos)
    //GET ALL PRODUCTS
    //GET: http://localhost:3000/api/v1/productos
    router.get('/productos', getAllProducts)//rellenar
    //GET PRODUCT by id
    //GET: http://localhost:3000/api/v1/producto/:id
    router.get('/producto/:id', getProductById)//rellenar
    //GET PRODUCT by cathegory
    //GET: http://localhost:3000/api/v1/producto/:category
    router.get('/productos/:categoria', getProductByCategory)//rellenar
    
    //CREATE PRODUCT
    //En este caso sólo hay que validar este porque hay que comprobar que tenga la info correcta
        //Check comprueba unas condiciones y las gestiona en el validateInput (una función creada por ti (middleware))
    //POST: http://localhost:3000/api/v1/producto
    router.post('/producto', [
        check('nombre', 'Debes escribir el nombre del producto').notEmpty().isString(), //Que no esté vacío el campo y que sea string
        check('descripcion', 'Debes escribir una descripcion').notEmpty(), //Son validaciones
        check('precio', 'Precion del producto').notEmpty().isNumeric(),
        validateInput //importarlo desde validateImput.js
    ], createProduct)//rellenar

    //UPDATE PRODUCT by id
    //PUT: http://localhost:3000/api/v1/producto/:id
    router.put('/producto/:id', updateProductById)//rellenar
    //DELETE PRODUCT by id
    //DELETE: http://localhost:3000/api/v1/producto/:id
    router.delete('/producto/:id', deleteProductById)//rellenar