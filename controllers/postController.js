const Post = require('../models/Post')
const User = require('../models/User')
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

// @desc getPost
// @route GET /post/:id
// @access Public
const getPost = async (req, res) => {
    try {
        const { id } = req.params
        const foundUser = await User.findById(id).select('-password').exec()
        const posts = await Post.find({
            user: [...foundUser.following, foundUser._id] //get all posts of authUser or posts of following people of authuser
        }).populate("user likes", "avatar username fullname")

        res.json({
            message: "success",
            postsLength: posts.length,
            posts
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

module.exports = {
    createPost,
    getPost
}