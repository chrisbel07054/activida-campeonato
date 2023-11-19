const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')
const { getEquipo, postEquipo, putEquipo, deleteEquipo, getCategoriaEquipo, deleteCategoriaEquipo} = require('../controllers/Equipo')

const router = Router()

router.get('/', getEquipo)

router.get('/:idCategoria', getCategoriaEquipo)

router.post('/',
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos , postEquipo)

router.put('/:id', 
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos , putEquipo)

router.put('/:idCategoria/:id', 
validarCampos , deleteCategoriaEquipo)

router.delete('/:id', deleteEquipo)

module.exports = router