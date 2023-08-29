const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    createComment,
    likeComment,
    unlikeComment,
    deleteComment
} = commentController

router.route('/comment')
    .post(createComment)

router.route('/comment/like')
    .post(likeComment)

router.route('/comment/unlike')
    .post(unlikeComment)

router.route('/comment/delete')
    .delete(deleteComment)

module.exports = router