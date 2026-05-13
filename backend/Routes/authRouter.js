const { signup, login } = require('../Controllers/authController');
const { signupValidation, loginValidation } = require('../Middleware/authValidations');

const router = require('express').Router();



//if signup is validated then only the controll will move to signup(authController)
router.post('/signup', signupValidation, signup)
//similarly for login, if it is validated then only
router.post('/login', loginValidation, login)


module.exports = router;