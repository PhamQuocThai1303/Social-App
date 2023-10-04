const User = require('../models/User')
const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const jwt = require('jsonwebtoken')

// @desc createMessage
// @route POST /message
// @access Public
const createMessage = async (req, res) => {
    const { sender, recipient, text, images, call } = req.body.message

    if (!recipient || (!text.trim() && images.length === 0 && !call)) return;

    //update or create a conversation
    const newConversation = await Conversation.findOneAndUpdate({
        $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] }
        ]
    }, {
        recipients: [sender, recipient],
        text, images, call
    }, { new: true, upsert: true }) //upsert: if conversation not exist, create one

    //create new message in exist conversation
    const newMessage = new Message({
        conversation: newConversation._id,
        sender, call,
        recipient, text, images
    })

    await newMessage.save()

    res.json({ message: 'Create Success!' })
}

// @desc getConversations
// @route GET /conversations/:id
// @access Public
const getConversations = async (req, res) => {
    const conversations = await Conversation.find({
        recipients: req.params.id
    }).sort('-updatedAt')
        .populate('recipients', 'avatar username fullname')


    res.json({
        conversations
    })
}

// @desc getMessage
// @route GET /message/:id/:authId
// @access Public
const getMessage = async (req, res) => {
    const { id, authId } = req.params

    const foundMessage = await Message.find({
        $or: [
            { sender: authId, recipient: id },
            { sender: id, recipient: authId }
        ]
    }).sort('-createAt')

    res.json({
        foundMessage
    })
}

module.exports = {
    createMessage,
    getConversations,
    getMessage,
}