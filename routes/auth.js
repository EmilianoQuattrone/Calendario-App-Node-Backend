/*
    Rutas del usuario:
    /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { revalidarJWT } = require('../middlewares/revalidar-token');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/nuevo',
    [ //Middlewares
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es requerido.').isEmail(),
        check('password', 'La contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post('/',
    [ //Middlewares
        check('email', 'El email es requerido.').isEmail(),
        check('password', 'La contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ],
    loginUsuario);

router.get('/renew', revalidarJWT, revalidarToken);

module.exports = router;