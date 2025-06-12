// VALIDAR EL TOKEN: 
// link apuntes https://medium.com/@diego.coder/autenticaci%C3%B3n-en-node-js-con-json-web-tokens-y-express-ed9d90c5b579 
const validateJWT = (req, res,next)


//Estructura en el artículo
function verifyToken(req, res, next) {
  const header = req.header("Authorization") || ""; //Pide la autorización del header
  const token = header.split(" ")[1]; header.split(" ") // Obtiene el token para después verificarlo 
  // Toma el segundo elemento del array del token real.
  // Divide el string en un array usando el espacio como separador.
  // Extrae el token de una cadena header, que típicamente contiene un valor Bearer (cadena aleatoria de numeros y letras)

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}




// TODO:
// El cliente envia el token al server
// Obtener el token del header "Authoritation"
// Extraer el token eliminado "Bearer"
// Verificar el token con la clave secreta JWT_SECRET
