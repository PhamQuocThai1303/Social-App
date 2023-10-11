const User = require('../models/User')
const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const jwt = require('jsonwebtoken')

// @desc createMessage 
// @route POST /message
// @access Public
const createMessage = async (req, res) => {
    const { sender, recipient, text, images } = req.body.message

    if (!recipient || (!text.trim() && images.length === 0)) return;

    //update or create a conversation
    const newConversation = await Conversation.findOneAndUpdate({
        $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] }
        ]
    }, {
        recipients: [sender, recipient],
        text, images
    }, { new: true, upsert: true }) //upsert: if conversation not exist, create one

    //create new message in exist conversation
    const newMessage = new Message({
        conversation: newConversation._id,
        sender, recipient, text, images
    })

    await newMessage.save()

    res.json({
        message: 'Create Success!',
        newMessage: newMessage
    })
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
    const { id, authId } = req.params //id: id of recipient

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

// @desc deleteMessage
// @route PATCH /message/:id/:authId
// @access Public
const deleteMessage = async (req, res) => {
    const { id, authId } = req.params //id: id of message

    await Message.findOneAndUpdate(
        { _id: id, sender: authId },
        {
            $set: {
                recall: true
            }
        }
    )
    res.json({ message: 'Delete Success!' })
}

// @desc restoreMessage
// @route PATCH /restoreMsg/:id/:authId
// @access Public
const restoreMessage = async (req, res) => {
    const { id, authId } = req.params //id: id of message

    await Message.findOneAndUpdate(
        { _id: id, sender: authId },
        {
            $set: {
                recall: false
            }
        }
    )
    res.json({ message: 'Restore Success!' })
}


// // @desc deleteConversation
// // @route DELETE /conversation/:id/:authId
// // @access Public
// const deleteConversation = async (req, res) => {
//************ Because of structure of conversation's db, once delete a conversation from user side, it also delete from the other side (recipient)************ */
//     const { id, authId } = req.params //id: id of recipient
//     const newConversation = await Conversation.findOneAndDelete({
//         $or: [
//             {recipients: [authId, id]},
//             {recipients: [id, authId]}
//         ]
//     })

//     await Message.deleteMany({conversation: newConversation._id})

//     res.json({ message: 'Delete Success!' })
// }

module.exports = {
    createMessage,
    getConversations,
    getMessage,
    deleteMessage,
    restoreMessage
    // deleteConversation
}