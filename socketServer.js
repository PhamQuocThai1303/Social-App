
let users = []

const socketServer = (socket) => {
    //Connect && Disconnect
    socket.on('joinUser', id => {  //socket.on -> is a method that listens for an event on the socket.
        users.push({ id, socketId: socket.id })
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
    })

    //Like post
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))//return all user who in follower of user of that post
        if (clients.length > 0) { //if clients exist, send event 'likeToClient' to each client
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost) //socket.to -> send event to a socket
            })
        }
    })
}

module.exports = socketServer