const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const Notify = require('../models/Notify')
const jwt = require('jsonwebtoken')

// @desc createNotify
// @route POST /notify
// @access Public
const createNotify = async (req, res) => {
    const { userId, postId, recipients, url, text, content } = req.body.notify
    // if(recipients.includes(req.user._id.toString())) return;

    const notify = new Notify({
        postId, recipients, url, text, content, user: userId
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



module.exports = {
    createNotify,
    deleteNotify,
    getNotify,
}