const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')
const { getCategoria, postCategoria, putCategoria, deleteCategoria, postCategoriaModalidad, deleteCategoriaModalidad} = require('../controllers/Categoria')

const router = Router()

router.get('/', getCategoria)

router.post('/',
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('premio','El premio es obligatorio').not().isEmpty(),

validarCampos , postCategoria)

router.post('/:idModalidad/:idCategoria', postCategoriaModalidad)

router.post('/delete/:idModalidad/:idCategoria', deleteCategoriaModalidad)


router.put('/:id', 
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('premio','El premio es obligatorio').not().isEmpty(),
validarCampos , putCategoria)

router.delete('/:id', deleteCategoria)

module.exports = router