const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request,res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msj:'no hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        const usuarioAutenticado = await Usuario.findById(uid);

        if(!usuarioAutenticado){
            return res.status(401).json({
                msj:'Token no valido - usuario no existe en bd'
            });
        }

        //verificar si el estado esta en true
        if (!usuarioAutenticado.estado){
            return res.status(401).json({
                msj:'Token no valido - usuario estado eliminado'
            });
        }
        req.usuarioAutenticado = usuarioAutenticado;


        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msj:'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}