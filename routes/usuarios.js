const { Router } = require('express');
const { check } = require('express-validator');

const {
        validarCampos,
        validarJWT,
        esAdminRol,
        tieneRole
} = require('../middlewares')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios.controller');

const { esRoleValido, existeEmail, existeUsuarioxId } = require('../helpers/db-validators');




const router = Router();

router.get('/',usuariosGet);

router.put('/:id', [
        check('id','No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioxId ),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password debe de ser mas de 6 letras').isLength( { min:6 } ),
        check('correo','El correo no es válido').isEmail(),
        check('correo').custom( existeEmail ),
        // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos
] , usuariosPost);

router.delete('/:id', [
        validarJWT,
        //esAdminRol,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id','No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioxId ),
        validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;