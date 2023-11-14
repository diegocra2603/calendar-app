/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [ //Midelwares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Debe ser un correo electronico valido').isEmail(),
        check('password', 'El Password debe de ser de 6 caracteres').isLength(6),
        validarCampos
    ],
    crearUsuario)

router.post(
    '/',
    [
        check('email', 'Debe ser un correo electronico valido').isEmail(),
        check('password', 'El Password debe de ser de 6 caracteres').isLength(6),
        validarCampos
    ],
    loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router;