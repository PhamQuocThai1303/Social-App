const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// @desc createComment
// @route POST /comment
// @access Public
const createComment = async (req, res) => {
    const { postId, userId, content, tag, reply } = req.body

    const newComment = new Comment({
        user: userId, content, tag, reply
    })

    await Post.findOneAndUpdate({ _id: postId }, {
        $push: { comments: newComment._id }
    }, { new: true })

    await newComment.save()

    res.json({ newComment })
}

// @desc likeComment
// @route POST /comment/like
// @access Public
const likeComment = async (req, res) => {
    const { cmtId, userId } = req.body

    await Comment.findOneAndUpdate({ _id: cmtId }, {
        $push: { likes: userId }
    }, { new: true })

    res.json({ message: 'Liked Comment!' })
}

// @desc unlikeComment
// @route POST /comment/unlike
// @access Public
const unlikeComment = async (req, res) => {
    const { cmtId, userId } = req.body

    await Comment.findOneAndUpdate({ _id: cmtId }, {
        $pull: { likes: userId }
    }, { new: true })

    res.json({ message: 'Unliked Comment!' })
}


module.exports = {
    createComment,
    likeComment,
    unlikeComment,
}