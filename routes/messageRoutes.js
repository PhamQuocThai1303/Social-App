const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    createMessage,
    getConversations,
    getMessage,
} = messageController

router.route('/message')
    .post(createMessage)

router.route('/conversations/:id')
    .get(getConversations)

router.route('/message/:id/:authId')
    .get(getMessage)


module.exports = router