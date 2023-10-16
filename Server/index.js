require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOption = require('./config/corsOption')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const socketServer = require('./socketServer')

//socket
const { createServer } = require('http');
const server = createServer(app);
const { Server } = require('socket.io');

//socket
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
    socketServer(socket)
});

const PORT = process.env.PORT || 3500
console.log(PORT);
connectDB()


app.use(logger)
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public'))) //static

app.use('/', require('./routes/root')) //root

//routes
// auth
app.use('/auth', require('./routes/authRoutes'))

//user
app.use('/', require('./routes/userRoutes'))

//post
app.use('/', require('./routes/postRoutes'))

//comment
app.use('/', require('./routes/commentRoutes'))

//notify
app.use('/', require('./routes/notifyRoutes'))

//message
app.use('/', require('./routes/messageRoutes'))


//Routes

app.all('*', (req, res) => { //cath-all middleware that go wrong path
    res.status(404)
    if (req.accepts('html')) { //If client require HTML, send to 404.html
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if (req.accepts('json')) { //If client require json, res is a json with 404 message
        res.json({ message: '404 not found' })
    }
    else { //else res is a simple text have 404 message 
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("connected to MongoDB");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})