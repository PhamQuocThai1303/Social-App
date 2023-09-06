const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// @desc createComment
// @route POST /comment
// @access Public
const createComment = async (req, res) => {
    const { postId, userId, content, tag, reply, postUserId } = req.body

    //check exist post if delete
    const post = await Post.findById(postId)
    if (!post) return res.status(400).json({ message: "This post does not exist." })
    //check cmt if post delete
    if (reply) {
        const cmt = await Comment.findById(reply)
        if (!cmt) return res.status(400).json({ message: "This comment does not exist." })
    }

    const newComment = new Comment({
        user: userId, content, tag, reply, postId, postUserId
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

// @desc deleteComment
// @route DELETE /comment/delete
// @access Public
const deleteComment = async (req, res) => {
    const { cmtId, userId } = req.body
    try {

        const comment = await Comment.findOneAndDelete({ //tim va xoa cmt
            _id: cmtId, //tim cmt co id = cmtId
            $or: [
                { user: userId }, //tim kiem cmt co thuoc tinh user = userId
                { postUserId: userId } //tim kiem cmt co thuoc tinh postUserId = userId
            ]
        })


        await Post.findOneAndUpdate({ _id: comment.postId }, { //tim va cap nhat post
            $pull: { comments: cmtId }
        })

        res.json({ message: 'Comment Deleted!' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createComment,
    likeComment,
    unlikeComment,
    deleteComment
}