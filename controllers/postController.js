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
        }).sort('-createdAt').populate("user likes", "avatar username fullname")

        res.json({
            message: "success",
            postsLength: posts.length,
            posts
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

// @desc updatePost
// @route PATCH /post
// @access Public
const updatePost = async (req, res) => {
    const { postId, content, images } = req.body

    const post = await Post.findOneAndUpdate({ _id: postId }, {
        content, images
    }).populate("user likes", "avatar username fullname")

    res.json({
        message: 'Post updated!',
        newPost: {
            ...post._doc, //copy all properties of post to newPost
            content, //content and images were added too this copy
            images
        }
    })
}

// @desc likePOst
// @route PATCH /post/like
// @access Public
const likePost = async (req, res) => {
    const { post, user } = req.body
    const postId = post?._id
    const userId = user?._id
    try {

        const like = await Post.findOneAndUpdate({ _id: postId }, {
            $push: { likes: userId }
        }, { new: true })

        if (!like) return res.status(400).json({ message: 'This post does not exist.' })

        res.json({ message: 'Liked Post!' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

// @desc unlikePost
// @route PATCH /post/unlike
// @access Public
const unlikePost = async (req, res) => {
    const { post, user } = req.body
    const postId = post?._id
    const userId = user?._id

    try {
        const like = await Post.findOneAndUpdate({ _id: postId }, {
            $pull: { likes: userId }
        }, { new: true })

        if (!like) return res.status(400).json({ message: 'This post does not exist.' })

        res.json({ message: 'UnLiked Post!' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

module.exports = {
    createPost,
    getPost,
    updatePost,
    likePost,
    unlikePost,
}