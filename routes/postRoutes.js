const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

const {
    createPost
} = postController

router.route('/post')
    .post(createPost)


module.exports = router