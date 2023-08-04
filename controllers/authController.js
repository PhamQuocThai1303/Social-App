const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Register
// @route POST /register
// @access Public
const register = async (req, res) => {
    const { fullname, username, email, password, gender } = req.body
    let newUserName = username.toLowerCase().replace(/ /g, '') // transfer to lowercase and delete white space

    if (!username || !password || !fullname || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    //check username exist
    const foundUserName = await User.findOne({ username: newUserName })
    if (foundUserName) return res.status(400).json({ message: "This user name already exists." })
    //check email exist
    const foundUserEmail = await User.findOne({ email })
    if (foundUserEmail) return res.status(400).json({ message: "This email already exists." })
    //check password length
    if (password.length < 5) return res.status(400).json({ message: "Password must be at least 6 characters." })

    const hashPass = await bcrypt.hash(password, 10) //so vong bam dc su dung de tao bam (nen dung tu 10-12)  

    const newUser = new User({
        fullname, username: newUserName, email, password: hashPass, gender
    })


    await newUser.save()
    return res.status(200).json({ message: 'Register success' })
}

// @desc Login
// @route POST /login
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ email }).exec()

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Password is not correct!' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "email": foundUser.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken, foundUser })
}

// @desc Refresh
// @route GET /refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "email": foundUser.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        }
    )
}

// @desc Logout
// @route POST /logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout,
    register
}