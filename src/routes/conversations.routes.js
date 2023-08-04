const { Router } = require('express')
const { createConversation, deleteConversation } = require('../controllers/conversations.controllers')
const authenticate = require('../middleware/auth.middleware')

const router = Router()

router.post('/conversations',authenticate,createConversation)

router.delete("/conversations/:id",authenticate, deleteConversation);

module.exports = router