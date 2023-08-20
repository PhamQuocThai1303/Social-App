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
        return res.status(500).json({ message: 'No users found!' })
    }
}

// @desc getUser
// @route GET /user/:id
// @access Public
const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const foundUser = await User.findById(id).select('-password').populate("followers following", "-password").exec()
        if (!foundUser) return res.status(400).json({ message: 'No user exist' })
        res.status(200).json({ foundUser })
    } catch (err) {
        return res.status(500).json({ message: 'No users found!' })
    }
}

// @desc updateUser
// @route POST /user/:id
// @access Public
const updateUser = async (req, res) => {
    const { id, fullname, mobile, address, website, story, gender, avatar } = req.body
    console.log(avatar);
    if (!fullname) return res.status(400).json({ message: "Fullname is required!" })

    if (fullname && fullname.length > 25) return res.status(400).json({ message: 'Max characters of fullname are 25' })

    if (story && story.length > 200) return res.status(400).json({ message: 'Max characters of story are 200' })

    await User.findOneAndUpdate({ _id: id }, {
        fullname, mobile, address, story, website, gender, avatar
    })

    res.json({ message: "Update Success!" })


}

// @desc followUser
// @route PATCH /user/:id/follow
// @access Public
const follow = async (req, res) => {
    const { id, user, authUser } = req.body
    const userId = user?._id
    const authUserId = authUser?._id
    // console.log(user, authUser);
    try {
        const foundUser = await User.find({ _id: userId, followers: authUserId })
        if (foundUser.length > 0) return res.status(500).json({ message: "You followed this user." })

        const newUser = await User.findOneAndUpdate({ _id: userId }, {
            $push: { followers: authUserId }
        }, { new: true }).populate("followers following", "-password") //new: true de tra ve ban sao moi cua user da tim thay

        await User.findOneAndUpdate({ _id: authUserId }, {
            $push: { following: userId }
        }, { new: true })

        res.json({ newUser })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// @desc unfollowUser
// @route PATCH /user/:id/unfollow
// @access Public
const unfollow = async (req, res) => {
    const { id, user, authUser } = req.body
    const userId = user?._id
    const authUserId = authUser?._id

    try {
        const newUser = await User.findOneAndUpdate({ _id: userId }, {
            $pull: { followers: authUserId }
        }, { new: true }).populate("followers following", "-password")

        await User.findOneAndUpdate({ _id: authUserId }, {
            $pull: { following: userId }
        }, { new: true })

        res.json({ newUser })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



module.exports = {
    searchUser,
    getUser,
    updateUser,
    follow,
    unfollow,
}