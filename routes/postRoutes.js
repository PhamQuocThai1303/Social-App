const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

const {
    createPost,
    getPost
} = postController

router.route('/post')
    .post(createPost)

router.route('/post/:id')
    .get(getPost)

module.exports = router