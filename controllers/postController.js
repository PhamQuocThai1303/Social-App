const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')

// @desc createPost
// @route POST /post
// @access Public
const createPost = async (req, res) => {
    const { userId, content, images } = req.body

    const newPost = new Post({
        content, images, user: userId
    })
    await newPost.save()

    res.json({
        message: 'Post created!',
        newPost
    })
}

// @desc getPost
// @route GET /post/:id
// @access Public
const getPost = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const foundUser = await User.findById(id).select('-password').exec()
            const posts = await Post.find({
                user: [...foundUser.following, foundUser._id] //get all posts of authUser or posts of following people of authuser
            }).sort('-createdAt')
                .populate("user likes", "avatar username fullname")//path: user likes, select:avatar username fullname; apply user and likes with select
                .populate({ //apply all user and likes to comment with select
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })

            res.json({
                message: "success",
                postsLength: posts.length,
                posts
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

// @desc updatePost
// @route PATCH /post
// @access Public
const updatePost = async (req, res) => {
    const { postId, content, images } = req.body

    const post = await Post.findOneAndUpdate({ _id: postId }, {
        content, images
    }).populate("user likes", "avatar username fullname")

    res.json({
        message: 'Post updated!',
        newPost: {
            ...post._doc, //copy all properties of post to newPost
            content, //content and images were added too this copy
            images
        }
    })
}

// @desc likePOst
// @route PATCH /post/like
// @access Public
const likePost = async (req, res) => {
    const { post, user } = req.body
    const postId = post?._id
    const userId = user?._id
    try {

        const like = await Post.findOneAndUpdate({ _id: postId }, {
            $push: { likes: userId }
        }, { new: true })

        if (!like) return res.status(400).json({ message: 'This post does not exist.' })

        res.json({ message: 'Liked Post!' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

// @desc unlikePost
// @route PATCH /post/unlike
// @access Public
const unlikePost = async (req, res) => {
    const { post, user } = req.body
    const postId = post?._id
    const userId = user?._id

    try {
        const like = await Post.findOneAndUpdate({ _id: postId }, {
            $pull: { likes: userId }
        }, { new: true })

        if (!like) return res.status(400).json({ message: 'This post does not exist.' })

        res.json({ message: 'UnLiked Post!' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

// @desc getUserPost
// @route GET /post/:id/userPost
// @access Public
const getUserPost = async (req, res) => {

    const posts = await Post.find({ user: req.params.id }).sort("-createdAt")
        .populate("user likes", "avatar username fullname")//path: user likes, select:avatar username fullname; apply user and likes with select
        .populate({ //apply all user and likes to comment with select
            path: "comments",
            populate: {
                path: "user likes",
                select: "-password"
            }
        })

    res.json({
        message: "success",
        postsLength: posts.length,
        posts
    })

}

// @desc getSinglePost
// @route GET /post/singlePost/:id
// @access Public
const getSinglePost = async (req, res) => { //chua su dung vi mot so vde lien quan den reducer post o frontend

    const post = await Post.findById(req.params.id)
        .populate("user likes", "avatar username fullname followers")
        .populate({
            path: "comments",
            populate: {
                path: "user likes",
                select: "-password"
            }
        })

    if (!post) return res.status(400).json({ message: 'This post does not exist.' })

    res.json({ post })
}

// @desc getDiscoverPost
// @route GET /discover/:id
// @access Public
const getDiscoverPost = async (req, res) => {

    const foundUser = await User.findById(req.params.id).select('-password').exec()

    const newArr = [...foundUser.following, foundUser._id]

    const posts = await Post.aggregate([ //group 
        { $match: { user: { $nin: newArr } } },//get user not found in newArr
        { $match: { images: { $ne: [] } } }, //get post that have images
        { $sample: { size: Number(12) } }, //get randomly some posts from user who in $match before

    ])

    return res.json({
        message: 'Success!',
        postsLength: posts.length,
        posts
    })
}

// @desc deletePost
// @route DELETE /deletePost
// @access Public
const deletePost = async (req, res) => {
    const { postId, userId } = req.body

    const post = await Post.findOneAndDelete({ _id: postId, user: userId })
    await Comment.deleteMany({ _id: { $in: post.comments } })

    res.json({
        message: 'Deleted Post Success!',
        newPost: {
            ...post
        }
    })
}

// @desc savePost
// @route PATCH /savePost
// @access Public
const savePost = async (req, res) => {
    const { post, user } = req.body
    const postId = post?._id
    const userId = user?._id

    const saved = await User.findOneAndUpdate({ _id: userId }, {
        $push: { saved: postId }
    }, { new: true })

    if (!saved) return res.status(400).json({ message: 'This user does not exist!' })

    res.json({ message: 'Post saved!' })
}

// @desc unsavePost
// @route PATCH /unsavePost
// @access Public
const unsavePost = async (req, res) => {
    const { post, user } = req.body
    const postId = post?._id
    const userId = user?._id

    const unsaved = await User.findOneAndUpdate({ _id: userId }, {
        $pull: { saved: postId }
    }, { new: true })

    if (!unsaved) return res.status(400).json({ message: 'This user does not exist!' })

    res.json({ message: 'Post Unsaved!' })
}

// @desc getSavePost
// @route GET /getSavePost/:id
// @access Public
const getSavePost = async (req, res) => {
    const { id } = req.params

    if (id) {
        const foundUser = await User.findById(id).select('-password').exec()
        const savePosts = await Post.find({
            _id: { $in: foundUser.saved } //get all posts of authUser or posts of following people of authuser
        })
            .populate("user likes", "avatar username fullname")//path: user likes, select:avatar username fullname; apply user and likes with select
            .populate({ //apply all user and likes to comment with select
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

        res.json({
            message: "success",
            savePostsLength: savePosts.length,
            savePosts
        })
    }
}


module.exports = {
    createPost,
    getPost,
    updatePost,
    likePost,
    unlikePost,
    getUserPost,
    getSinglePost,
    getDiscoverPost,
    deletePost,
    savePost,
    unsavePost,
    getSavePost,
}