const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')
const { getPatrocinador, postPatrocinador, putPatrocinador, deletePatrocinador} = require('../controllers/Patrocinador')
const Patrocinador = require('../models/Patrocinador')

const router = Router()

router.get('/', async (req, resp) => {
    
    const [patrocinador] = await Promise.all([
        Patrocinador.find()
    ])

    resp.render('pages/patrocinadores', {patrocinador})
})

router.get('/patrocinador', getPatrocinador)

router.post('/',
check('nombreComercial','El nombreComercial es obligatorio').not().isEmpty(),
check('personaContacto','El personaContacto es obligatorio').not().isEmpty(),
check('telefono','El telefono es obligatorio').not().isEmpty(),
check('patrocinio','El Patrocinio es obligatorio').not().isEmpty(),
validarCampos , postPatrocinador)

router.put('/:id', 
check('nombreComercial','El nombreComercial es obligatorio').not().isEmpty(),
check('personaContacto','El personaContacto es obligatorio').not().isEmpty(),
check('telefono','El telefono es obligatorio').not().isEmpty(),
check('patrocinio','El Patrocinio es obligatorio').not().isEmpty(),
validarCampos, putPatrocinador)

router.delete('/:id', deletePatrocinador)

module.exports = router