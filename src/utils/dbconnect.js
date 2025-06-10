

// CONEXIÓN CON MONGOOSE (moongose con la base de datos)
const mongoose = require('mongoose');
const connection = async () => {
    const uri = process.env.MONGO_URI
    // console.log(uri)
    try {
        const connection = await mongoose.connect(uri) // Obtiene la URI de conexión a MongoDB desde las variables de entorno.
        console.log('BBDD connected')

    } catch (error) {
        throw {
            ok: false,
            msg: 'Error al connectar con la bbdd'
        }
    }
}

module.exports = {
    connection
}

/*Comprobación de funcionamiento: 
    En consola node: node src/utils/dbconnect.js
    En la parte de arriba del doc: 
    Cargar las variables de entorno del archivo .env con
        require('dotenv').config();
*/