const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const Notify = require('../models/Notify')
const jwt = require('jsonwebtoken')

// @desc createNotify
// @route POST /notify
// @access Public
const createNotify = async (req, res) => {
    const { userId, postId, cmtId, recipients, url, text, content } = req.body.notify

    const notify = new Notify({
        postId, recipients, url, text, content, user: userId, cmtId
    })

    await notify.save()
    return res.json({ notify })
}

// @desc deleteNotify
// @route DELETE /notify
// @access Public
const deleteNotify = async (req, res) => {
    const { postId, url } = req.body.notify
    const notify = await Notify.findOneAndDelete({
        postId: postId, url: url
    })

    return res.json({ notify })
}

// @desc getNotify
// @route GET /notify/:id
// @access Public
const getNotify = async (req, res) => {

    const notifies = await Notify.find({ recipients: req.params.id }) //userId
        .sort('-createdAt').populate('user', 'avatar username')

    return res.json({ notifies })
}

// @desc isReadNotify
// @route PATCH /isReadNotify/:id
// @access Public
const isReadNotify = async (req, res) => {
    const { id } = req.params
    const notify = await Notify.findOneAndUpdate({ _id: id }, {
        isRead: true
    }, { new: true }).populate("user", "avatar username")

    return res.json({ notify })
}

// @desc readAllNotify
// @route PATCH /readAllNotify
// @access Public
const readAllNotify = async (req, res) => {
    const { notiArr } = req.body

    const notifies = await Notify.updateMany(
        { _id: { $in: notiArr } },
        { isRead: true }
    )

    return res.json({ notifies })
}

// @desc deleteAllNotify
// @route DELETE /deleteAllNotify
// @access Public
const deleteAllNotify = async (req, res) => {
    const { userId } = req.body
    const notifies = await Notify.deleteMany({ recipients: userId })

    return res.json({ notifies })
}



module.exports = {
    createNotify,
    deleteNotify,
    getNotify,
    isReadNotify,
    readAllNotify,
    deleteAllNotify
}