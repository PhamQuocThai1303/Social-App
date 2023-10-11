const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true, // delete white space
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/pqt/image/upload/v1696685735/t-connect/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8_ztjdmm.jpg'
    },
    role: {
        type: String,
        default: 'user'
    },
    gender: {
        type: String,
        default: 'male'
    },
    mobile: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    story: {
        type: String,
        default: '',
        maxlength: 200
    },
    website: {
        type: String,
        default: ''
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)