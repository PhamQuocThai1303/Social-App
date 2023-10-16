const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    text: String,
    images: Array,
    call: Object
}, {
    timestamps: true
})

module.exports = mongoose.model('Conversation', conversationSchema)