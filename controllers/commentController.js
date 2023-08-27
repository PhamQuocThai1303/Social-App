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


module.exports = {
    createComment,

}