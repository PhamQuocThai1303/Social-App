const allowedOrigins = require('./allowedOrigin')

const corsOption = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOption