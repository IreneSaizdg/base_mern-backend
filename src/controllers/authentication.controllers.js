// IMPORTACIONES 
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')

/* FUNCIONES CONTROLADORAS
    Aquí se hacen las validaciones
    express, login, register, renewtoken... */

const deleteProductById = (req, res)=>{         
    res.json({
        msg: 'Deleting product by id.'
    });
}





//LOGIN
const login = (req, res) =>{
    res.status(200).json({
        ok: true, 
        msg: 'login'
    })
    //TODO: recoger el body
	//TODO: comprobar si el usuario existe (con ese email)
		// Si no existe: devolver el 403
		// Si si existe: comprobar si las contraseñas coinciden
			//Si no coincide: return 403
			//Si coincide: crear token, return 202
			bcrypt.compareSync (password, shhhh)
}




//REGISTER
const register = async (req, res) =>{
    /* Comprobación de prueba
        res.status(200).json({
            ok: true, 
            msg: 'register'
        })*/    
    
    /* Pseudocode
        //TODO: traer los datos de body (está en el req)(datos del usuario) 

        //TODO: buscar si el usuario ya existe
            //si existe: return 403 (te saca y te avisa de que el usuario existe)
            //si no existe: 
                //encriptar contraseña
                //añadir a la base de datos
        //crear el token
        //return 200
    */
    
    const { email, name, password } = req.body;

    try {
        // Buscar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({
                ok: false,
                msg: 'El usuario ya existe',
            });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const passwordEncrypt = bcrypt.hashSync(password, salt);

        // Crear nuevo usuario
        const newUser = new User({ email, name, password: passwordEncrypt });

        // Guardar en la base de datos
        const savedUser = await newUser.save();

        // Generar token
        const token = await JWTGenerator(savedUser._id, savedUser.role);

        // Respuesta exitosa
        res.status(200).json({
            ok: true,
            msg: 'Usuario registrado correctamente',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor al registrar el usuario, contacta con el administrador.',
        });
    }
};




//RENEWTOKEN
const renewToken = (req, res) =>{
    res.status(200).json({
        ok: true, 
        msg: 'renewToken'
    })    
}





//EXPORTACIONES
module.exports = {login, register, renewToken}