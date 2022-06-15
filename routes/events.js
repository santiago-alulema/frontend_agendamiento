
const {Router} = require('express');
const {check} = require('express-validator')
const {validateJwt} = require('../middlewares/validate-Jwt');
const eventos = require('../controllers/eventController')
const {validarCampos} = require('../middlewares/validar-campos')
const {isDate} = require('../helpers/isDate')
const router = Router();
//el token es obligatorio para usar los Endpoint
router.use(validateJwt)
//obtener Eventos
router.get('/', eventos.getEvents)
router.post('/create-event', [
    check('title',"El title no debe ser vacio").not().isEmpty(),
    check('start',"Fecha de inicio es obligatorio").custom(isDate),
    check('end',"Fecha de fin es obligatorio").custom(isDate),
    validarCampos
],eventos.createEvent)
router.put('/:id', eventos.updateEvent)
router.delete('/:id', eventos.removeEvent)

module.exports = router