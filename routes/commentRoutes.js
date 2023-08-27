const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    createComment
} = commentController

router.route('/comment')
    .post(createComment)


module.exports = router