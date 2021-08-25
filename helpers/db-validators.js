const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
            throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

//Verificar si el correo existe
const existeEmail = async (correo = '') => {
    const existeEmail = await usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo ${correo} ya existe en la BD`);
    }
};

//Verificar si existe usuario por id
const existeUsuarioxId = async (id = '') => {

    const existeUsuario = await usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id : ${id} no existe en la BD`);
    }
};




module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioxId
}