/*CONFIG DE MÓDULO NPM DOTENV
    Sirve para cargar variables de entorno desde un archivo 
    .env a process.env dentro de tu aplicación Node.js.*/
require('dotenv').config() 




/* CREAR SERVIDOR CON EXPRESS 
    Se puede hacer con módulo http, con express, o moongose */
// Importar Express
const express = require("express");     // Importa el framework EXPRESS para crear el servidor y gestionar rutas.
const cors = require("cors");           // Importa el middleware CORS para permitir peticiones desde otros dominios.
const mongoose = require("mongoose")    // Importa el paquete mongoosse para facilitar la interacción con la bbdd Mongo.

const app = express(); //Hacer uso de express

// Importa rutas publicas desde public.routes
const publicRoutes = require('./routes/public.routes');
const authenticationRoutes = require('./routes/authentication.routes.js') //Trae la ruta
// Puerto desde variable de entorno o por defecto 3000
const port = process.env.PORT || 3000; //Coge la variable de entorno o 3000

// Arrancar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

/* Ruta de prueba
    app.get("/", (req, res) => {
        res.send("<h1>Ruta index</h1>");
    });*/





// CONEXION:
const { connection } = require('./utils/dbconnect');    //Desestructuración de connection en dbconnect.js.
connection().catch((error) =>{
    console.log(error)
})



// MIDDLEWARES ---------------------------------------- 
/* CORS 
    info en https://www.npmjs.com/package/cors */ 
const whiteList = ['http://localhost:3000', 'http://xxxx-front.render.com'] // Array de dominios con acceso permitido (CORS)
app.use(cors({
    origin: whiteList,
}))


/* BODY-PARSE (incl con express)*/
app.use(express.urlencoded()) // Permite leer datos enviados desde formularios HTML (formato x-www-form-urlencoded)
app.use(express.json()) // Permite leer datos en formato JSON enviados en el body de las peticiones (API REST)





/* RUTAS app.js
    Cada ruta contiene como mínimo 4 rutas: get, add, update, delete... 
    Se hacen directamente en public.routes.*/

app.use("/api/v1", publicRoutes); //Llamada a la ruta index de public.routes.js
app.use("/api/v1/servicios", publicRoutes); //Llamada a la ruta servicios de public.routes.js
app.use("/api/v1/productos", publicRoutes); //Llamada a la ruta productos de public.routes.js

// Ruta de autentificación
app.use('/', require('./routes/authentication.routes.js'))
app.use('/api/v1/auth', authenticationRoutes);