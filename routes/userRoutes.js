const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

const {
    searchUser,
    getUser
} = userController

router.route('/search')
    .post(searchUser)

router.route('/profile/:id')
    .get(getUser)

module.exports = router