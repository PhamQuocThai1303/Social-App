const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

const {
    searchUser
} = userController

router.route('/')
    .post(searchUser)

module.exports = router