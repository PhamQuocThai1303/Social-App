const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    createComment,
    likeComment,
    unlikeComment
} = commentController

router.route('/comment')
    .post(createComment)

router.route('/comment/like')
    .post(likeComment)

router.route('/comment/unlike')
    .post(unlikeComment)

module.exports = router