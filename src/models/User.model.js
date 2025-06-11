// Importamos Schema y model del paquete mongoose
const { Schema, model } = require('mongoose');

// Creamos un nuevo esquema de Mongoose llamado "Auth"
const User = new Schema({

    name: {               // Campo 'nombre' del producto
        type: String,       // Tipo de dato: cadena de texto
        required: true,     // Este campo es obligatorio
    },

    pasword: {
        type: String,     
        required: true    
    },

    email: {
        type: String,     
        required: true    
    },

    role:{
        type: String, // TODO: buscar como un usuario puede tener diferentes roles
        required: true,
        default: 'user'
    }
    
});

// Exportamos un modelo llamado 'productos' basado en el esquema Product
// Esto creará (o usará) una colección llamada 'Users' en MongoDB
module.exports = model('Users', User);