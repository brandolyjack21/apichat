const { Router } = require('express')
const authenticate = require('../middleware/auth.middleware')
const { createMessages, collectMessages } = require('../controllers/messages.controllers')

const router = Router()

router.post('/messages',authenticate,createMessages)
router.get('/messages/:id',authenticate,collectMessages)

module.exports = router

