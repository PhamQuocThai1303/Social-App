const express = require('express')
const router = express.Router()
const notifyController = require('../controllers/notifyController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    createNotify,
    deleteNotify,
} = notifyController

router.route('/notify')
    .post(createNotify)

router.route('/notify')
    .delete(deleteNotify)

module.exports = router