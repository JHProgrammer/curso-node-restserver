const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async( req, res = response) => {

    const { correo,password} = req.body

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario){
            return res.status(400).json({
                ms: 'Usuario / Password no son correctos - correo'
            });
        }

        //verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                ms: 'Usuario / Password no son correctos - estado:false'
            });
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                ms: 'Usuario / Password no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generarJWT( usuario.id);

        res.json({
            ms: 'login ok',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salió mal'
        })
    }

}

const googleSingin = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const {correo,nombre,img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuario en DB esta borrado
        if ( !usuario.estado ){
            res.status(401).json({
                msj: 'Usuario bloqueado'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id);

        res.json({
            msg: 'todo bien Google Sing in',
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            msj: 'Token de google no es valido'
        })
    }

}


module.exports = {
    login,
    googleSingin
}