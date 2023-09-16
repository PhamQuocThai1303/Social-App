const express = require('express')
const router = express.Router()
const notifyController = require('../controllers/notifyController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    createNotify,
    deleteNotify,
    getNotify,
    isReadNotify,
    readAllNotify,
    deleteAllNotify
} = notifyController

router.route('/notify')
    .post(createNotify)

router.route('/notify')
    .delete(deleteNotify)

router.route('/notify/:id')
    .get(getNotify)

router.route('/isReadNotify/:id')
    .patch(isReadNotify)

router.route('/readAllNotify')
    .patch(readAllNotify)

router.route('/deleteAllNotify')
    .delete(deleteAllNotify)

module.exports = router