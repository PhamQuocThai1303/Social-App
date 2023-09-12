const express = require('express')
const router = express.Router()
const notifyController = require('../controllers/notifyController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    createNotify,
    deleteNotify,
    getNotify,
} = notifyController

router.route('/notify')
    .post(createNotify)

router.route('/notify')
    .delete(deleteNotify)

router.route('/notify/:id')
    .get(getNotify)

module.exports = router