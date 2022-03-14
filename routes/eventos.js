/*
    Rutas del los eventos:
    /api/eventos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventos');
const isDate = require('../helpers/isDate');
const { revalidarJWT } = require('../middlewares/revalidar-token');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//Obtener eventos.
router.get('/', revalidarJWT, getEventos);

//Crear eventos.
router.post('/',
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio es requerida').custom(isDate),
        check('end', 'Fecha de finalizacion es requerida').custom(isDate),
        validarCampos,
        revalidarJWT
    ], crearEvento);

//Actualizar eventos.
router.put('/:id',
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio es requerida').custom(isDate),
        check('end', 'Fecha de finalizacion es requerida').custom(isDate),
        validarCampos,
        revalidarJWT
    ], actualizarEvento);

//Eliminar evento.
router.delete('/:id',
    [
        validarCampos,
        revalidarJWT
    ], eliminarEvento);

module.exports = router;