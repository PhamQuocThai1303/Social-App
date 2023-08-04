const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.Schema.Types.ObjectId,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    postId: mongoose.Schema.Types.ObjectId,
    postUserId: mongoose.Schema.Types.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)