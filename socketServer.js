
let users = [] //store all users on server

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

    //Unlike post
    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))//return all user who in follower of user of that post

        if (clients.length > 0) { //if clients exist, send event 'likeToClient' to each client
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost) //socket.to -> send event to a socket
            })
        }
    })

    //Create comment
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))//return all user who in follower of user of that post

        if (clients.length > 0) { //if clients exist, send event 'likeToClient' to each client
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost) //socket.to -> send event to a socket
            })
        }
    })

    //Delete comment
    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))//return all user who in follower of user of that post

        if (clients.length > 0) { //if clients exist, send event 'likeToClient' to each client
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost) //socket.to -> send event to a socket
            })
        }
    })

    //Follow
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id) //find user who recently have followed
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    //unFollow
    socket.on('unfollow', newUser => {
        const user = users.find(user => user.id === newUser._id) //find user who recently have unfollowed
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })

    //create Notification
    socket.on('createNotify', arg => {
        const client = users.find(user => arg.recipients.includes(user.id)) //find user of users who in client following
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', arg)
    })

    //delete Notification
    socket.on('deleteNotify', arg => {
        if (!arg.recipients) return;
        const client = users.find(user => arg.recipients.includes(user.id)) //find user of users who in client following
        if (client) socket.to(`${client.socketId}`).emit('deleteNotifyToClient', arg)
        else return;
    })

    //addMessage
    socket.on('addMessage', message => {
        const user = users.find(user => user.id === message.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', message)
    })
}

module.exports = socketServer