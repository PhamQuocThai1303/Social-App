const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

const {
    createPost,
    getPost,
    updatePost,
    likePost,
    unlikePost,
    getUserPost,
    getSinglePost,
    getDiscoverPost,
    deletePost,
} = postController

router.route('/post')
    .post(createPost)
    .patch(updatePost)

router.route('/post/:id')
    .get(getPost)

router.route('/post/singlePost/:id')
    .get(getSinglePost)

router.route('/post/:id/userPost')
    .get(getUserPost)

router.route('/post/like')
    .patch(likePost)

router.route('/post/unlike')
    .patch(unlikePost)

router.route('/discover/:id')
    .get(getDiscoverPost)

router.route('/deletePost')
    .delete(deletePost)

module.exports = router