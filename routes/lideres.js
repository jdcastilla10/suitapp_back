
const { Router } = require('express')
const { 
        getLeaderByName,
    } = require('../controllers/LideresControllers')
const { validateFields, validateEmail, validateDni } = require('../middlewares/validateFields')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/',getLeaderByName)








module.exports= router