/*
    Rutas de Usuarios / Auth
    host + /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas tienen que pasar por este midellware
router.use(validarJWT);

// Obtener Eventos
router.get('/', obtenerEventos);

//Crear Evento
router.post('/', [
    check('title', 'El Titulo es obligatorio').not().isEmpty(),
    check('start', 'La Fecha de inicio debe de ser correcta').custom(isDate),
    check('end', 'La Fecha fin debe de ser correcta').custom(isDate),
    validarCampos
], crearEvento);

//Acturalizar Evento
router.put('/:eventoId', [
    check('title', 'El Titulo es obligatorio').not().isEmpty(),
    check('start', 'La Fecha de inicio debe de ser correcta').custom(isDate),
    check('end', 'La Fecha fin debe de ser correcta').custom(isDate),
    validarCampos
], actualizarEvento);

//Eliminar Evento
router.delete('/:eventoId', eliminarEvento);


module.exports = router;