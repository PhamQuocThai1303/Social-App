const Post = require('../models/Post')
const jwt = require('jsonwebtoken')

// @desc createPost
// @route POST /post
// @access Public
const createPost = async (req, res) => {
    const { userId, content, images } = req.body

    const newPost = new Post({
        content, images, user: userId
    })
    await newPost.save()

    res.json({
        message: 'Post created!',
        newPost
    })
}

module.exports = {
    createPost
}