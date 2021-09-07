const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo','El correo tiene que ser valido').isEmail(),
    check('password','la contraseña es obligatorio').notEmpty(),
    validarCampos
],login);


module.exports = router;