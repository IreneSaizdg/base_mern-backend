// Importamos Schema y model del paquete mongoose
const { Schema, model } = require('mongoose');

// Creamos un nuevo esquema de Mongoose llamado "Product"
const Product = new Schema({

    nombre: {               // Campo 'nombre' del producto
        type: String,       // Tipo de dato: cadena de texto
        required: true,     // Este campo es obligatorio
        unique: true        // No puede haber dos productos con el mismo nombre
    },

    descripcion: {
        type: String,     
        required: true    
    },

    precio: {
        type: Number,     
        required: true    
    }
});

// Exportamos un modelo llamado 'productos' basado en el esquema Product
// Esto creará (o usará) una colección llamada 'productos' en MongoDB
module.exports = model('productos', Product);