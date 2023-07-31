const { Router } = require('express')
const { createUser, loginUser } = require('../controllers/user.controller')
const { loginUserValidation, registerUserValidator } = require('../validators/users.validator')
const authenticate = require("../middleware/auth.middleware");


const router = Router()

router.post('/users',registerUserValidator,createUser)
router.post('/login',loginUserValidation,loginUser)
router.get('/users', authenticate, (req, res) => {
    console.log(req);
    res.send("users");
  })

module.exports = router