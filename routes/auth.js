
const { Router } = require('express')
const { 
    authLogin, authRegistro, 
    authLogout
    } = require('../controllers/AuthControllers')
const { validateEmail, validateDni, validateFields } = require('../middlewares/validateFields')

const router = Router()

router.post('/login',authLogin )
router.post('/logout',authLogout )
router.post('/register',[validateEmail,validateDni,validateFields],authRegistro )








module.exports= router