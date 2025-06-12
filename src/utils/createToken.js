const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



// FUNCIÓN PARA GENERAR TOKENS
// jsonwebtoken no trabaja con funciones asincrónicas directamente, por eso se usa una Promesa.
const JWTGenerator = async (uid, role) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, role };

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '2h',
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Error al generar el Token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};




// EXPORTACIONES
module.exports = {
    JWTGenerator
};