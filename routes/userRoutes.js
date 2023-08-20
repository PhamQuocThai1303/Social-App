const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

const {
    searchUser,
    getUser,
    updateUser,
    follow,
    unfollow
} = userController

router.route('/search')
    .post(searchUser)

router.route('/profile/:id')
    .get(getUser)
    .post(updateUser)

router.route('/profile/:id/follow')
    .patch(follow)

router.route('/profile/:id/unfollow')
    .patch(unfollow)

module.exports = router