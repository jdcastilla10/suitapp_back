
const { Router } = require('express')
const { usuariosGet, 
        actualizar_usuario, 
        eliminar_usuario, 
        registro_usuario, 
        listar_vigilantes,
        getVigilanteByDni,
        ingresarVehiculo,
        salidaVehiculo,
        logsVehiculos
    } = require('../controllers/UsuariosControllers')
const { validateFields, validateEmail, validateDni } = require('../middlewares/validateFields')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()


router.post('/registro',[validateEmail,validateDni,validateFields],registro_usuario )
router.put('/vigilantes/:id',actualizar_usuario)
router.post('/eliminar-usuario',[validateFields],eliminar_usuario)
router.get('/vigilantes/listar-vigilantes',listar_vigilantes)
router.get('/vigilantes/:dni',getVigilanteByDni)
router.post('/ingresar-vehiculo',ingresarVehiculo)
router.post('/salida-vehiculo',salidaVehiculo)
router.get('/vehiculos/log-vehiculos',logsVehiculos)








module.exports= router