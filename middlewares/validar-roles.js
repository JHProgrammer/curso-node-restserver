const { request, response } = require("express")

const esAdminRol = (req = request, res = response, next) => {

        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msj: 'Se quiere validar el rol sin verificar el usuario primero'
            })
        }

        const { rol, nombre} = req.usuarioAutenticado;

        if(rol !== "ADMIN_ROLE"){
            return res.status(401).json({
                msj: `el  ${nombre} no es administrador`
            })
        }

        next();
}

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {
        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msj: 'Se quiere validar el rol sin verificar el usuario primero'
            })
        }

        const { rol, nombre} = req.usuarioAutenticado;

        if (!roles.includes(rol)){
            return res.status(401).json({
                msj: `el servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRole
}