const User = require('../models/User')
const jwt = require('jsonwebtoken')

// @desc Search
// @route POST /search
// @access Public
const searchUser = async (req, res) => {
    const { username } = req.body
    try {
        const users = await User.find({ username: { $regex: username } })
            .limit(5).select("fullname username avatar")

        res.status(200).json({ users })
    } catch (err) {
        return res.status(500).json({ msg: 'No users found!' })
    }
}


module.exports = {
    searchUser
}