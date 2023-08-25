const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

const {
    createPost,
    getPost,
    likePost,
    unlikePost,
} = postController

router.route('/post')
    .post(createPost)

router.route('/post/:id')
    .get(getPost)

router.route('/post/like')
    .patch(likePost)

router.route('/post/unlike')
    .patch(unlikePost)

module.exports = router