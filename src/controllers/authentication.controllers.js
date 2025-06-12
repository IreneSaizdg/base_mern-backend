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





/*LOGIN
Verificar si un usuario puede acceder a su cuenta con 
las credenciales correctas (email y contraseña) 
si es así, darle acceso (con un token)*/
const login = async (req, res) =>{

    try{
        //Recoger datos del body
        const { email, password } = req.body; //Toma el email y el password del body
        
        //Comprobar si el user existe (por email)
        const existingUser = await User.findOne({ email: email }) // Busca en la base de datos un usuario que tenga el mismo email 
        if (!existingUser){ // Si existing user da null (no existe)
            return res.status(403).json({ // 403 FORBIDEN: sin autorización para entrar. 
                ok: false,
                msg: 'Usuario no registrado',
            });
        }
        // Encriptar la contraseña
        /* Cifra la contraseña del usuario antes de guardarla en la base de datos con un método de bcrypt
            Contraseñas iguales pueden tener hashes distintos gracias al salt*/
        // const salt = bcrypt.genSaltSync(10); //Genera un salt (valor aleatorio)
        // const passwordEncrypt = bcrypt.hashSync(password, salt); //Cifra la contraseña usando el salt


        //Comprobar si la contraseña coincide
        const passwordOk = bcrypt.compareSync(password, existingUser.password); //Función de librería bcrypt que compara una contraseña normal con una cifrada
        if(!passwordOk){
            return res.status(403).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        }

        //Si todo está bien crear token y devolver éxito
        //TODO: generar token JWT //const token = ...
        return res.status(202).json({ //201 CREATED: Solicitud exitosa se creó un nuevo recurso (token)
            ok: true,
            msg: 'Login correcto',
            //token: token
        })

    //Gestion de errores
    } catch (error) {
        console.error(error); // Error directo a consola
        res.status(500).json({ // Enviamos una respuesta al servidor con estado 500
            ok: false,
            msg: 'Error al acceder a su cuenta, contacte con el administrador.',
        });
    }

    /*Pseudocode
    //TODO: recoger el body
	//TODO: comprobar si el usuario existe (con ese email)
		// Si no existe: devolver el 403
		// Si si existe: comprobar si las contraseñas coinciden
			//Si no coincide: return 403
			//Si coincide: crear token, return 202
			bcrypt.compareSync (password, shhhh)*/            
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
            return res.status(403).json({ //403 FORBIDEN: acceso no autorizado
                ok: false,
                msg: 'El usuario ya existe',
            });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10); //Genera un salt (valor aleatorio)
        const passwordEncrypt = bcrypt.hashSync(password, salt); //Cifra la contraseña usando el salt

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