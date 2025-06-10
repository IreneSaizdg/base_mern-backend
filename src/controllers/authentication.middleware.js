/* ISADMIN 
    para comprobar si un usuario es administrador o no, y dejarle pasar a una ruta o no*/
const isAdmin=(req,res,next)=>{
    if(req.body.isAdmin){
        next()
    }else{
        res.status(403).send(`Lo sentimos, no esta autorizado para acceder a ${req.url} en el middleware`)
    }
}

module.exports = {
    isAdmin
}