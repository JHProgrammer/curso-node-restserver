const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingin } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo','El correo tiene que ser valido').isEmail(),
    check('password','la contraseña es obligatorio').notEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSingin);


module.exports = router;