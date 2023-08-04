const { Router } = require('express')
const { createUser, loginUser, allContacts } = require('../controllers/user.controller')
const { loginUserValidation, registerUserValidator } = require('../validators/users.validator')
const authenticate = require("../middleware/auth.middleware");
const { allConversations } = require('../controllers/conversations.controllers');


const router = Router()

router.post('/users',registerUserValidator,createUser)
router.post('/login',loginUserValidation,loginUser)
router.get('/users', authenticate, (req, res) => {
    console.log(req);
    res.send("users");
  })
router.get('/contacts',authenticate,allContacts)
router.get('/user/conversations/:id',allConversations)

module.exports = router