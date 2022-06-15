const {Router} = require('express');
const router = Router();
const apiAuth = require('../controllers/authController')
const {check} = require('express-validator')
const {validateJwt} = require('../middlewares/validate-Jwt');


router.post('/create-user', [
                            check('username', 'En nombre el obligatorio').not().isEmpty(),
                            check('email', 'En Email el obligatorio').isEmail(),
                            check('password', 'En Password debe de ser de 6 a 8 caracteres').isLength({min:6, max:8}),
                                ],apiAuth.createUser)
router.post('/login',[
                        check('email', 'El Email es obligatorio').isEmail(),
                        check('password', 'En Password no debe ser vacio').not().isEmpty(),
                        ],apiAuth.loginUser)
router.get('/renew-token', validateJwt, apiAuth.renewUser)



module.exports = router