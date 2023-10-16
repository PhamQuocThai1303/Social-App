const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const {
    login,
    refresh,
    logout,
    register
} = authController

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)

module.exports = router