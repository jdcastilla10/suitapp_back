
const { Router } = require('express')
const { updateVoterState,getVoterByDni,getVotersByCandidate
    } = require('../controllers/VotantesControllers')
const { validateFields, validateEmail, validateDni } = require('../middlewares/validateFields')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()


router.get('/',getVoterByDni)
router.post('/',updateVoterState)
router.get('/all',getVotersByCandidate)
// router.put('/votantes/:id',updateVoterState)
// router.get('/votantes/listar',votantesGet)









module.exports= router