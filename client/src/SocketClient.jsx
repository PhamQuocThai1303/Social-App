import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createNotify, deleteNotify } from "./redux/reducers/notifyReducer"
import { addMessage, deleteMessage } from "./redux/reducers/messageReducer"
import { useGetMessageMutation } from "./redux/actions/messageAction"
import { setOnline, setOffline } from "./redux/reducers/onlineReducer"

const SocketClient = () => {
    const { user } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)
    const { online } = useSelector((state) => state.online)

    const [getMessage] = useGetMessageMutation()

    const dispatch = useDispatch()

    //joinUser
    useEffect(() => {
        socket.emit('joinUser', user)
    }, [socket, user])

    //likePost
    useEffect(() => {
        socket.on('likeToClient', newPost => {
            // console.log(newPost);
        })
        return () => socket.off('likeToClient') //cancel an event on socket
    }, [socket])

    //unlikePost 
    useEffect(() => {
        socket.on('unLikeToClient', newPost => {
            // console.log(newPost);
        })

        return () => socket.off('unLikeToClient')
    }, [socket])

    //createComment
    useEffect(() => {
        socket.on('createCommentToClient', newPost => {
            // console.log(newPost)
        })
        return () => socket.off('createCommentToClient') //cancel an event on socket

    }, [socket])

    //deleteComment
    useEffect(() => {
        socket.on('deleteCommentToClient', newPost => {
            // console.log(newPost)
        })
        return () => socket.off('deleteCommentToClient') //cancel an event on socket

    }, [socket])

    //followUser
    useEffect(() => {
        socket.on('followToClient', newUser => {
            console.log(newUser)
        })
        return () => socket.off('followToClient') //cancel an event on socket

    }, [socket])

    //unfollowUser
    useEffect(() => {
        socket.on('unFollowToClient', newUser => {
            // console.log(newUser)
        })
        return () => socket.off('unFollowToClient') //cancel an event on socket

    }, [socket])

    //create notification
    useEffect(() => {
        socket.on('createNotifyToClient', newUser => {
            // console.log(arg)
            dispatch(createNotify({ notify: newUser }))
        })
        return () => socket.off('createNotifyToClient') //cancel an event on socket

    }, [socket])

    //delete notification
    useEffect(() => {
        socket.on('deleteNotifyToClient', newUser => {
            // console.log(arg)
            dispatch(deleteNotify({ notify: newUser }))
        })
        return () => socket.off('deleteNotifyToClient') //cancel an event on socket

    }, [socket])

    //add message
    useEffect(() => {
        socket.on('addMessageToClient', message => {
            dispatch(addMessage(message))
        })
        return () => socket.off('addMessageToClient') //cancel an event on socket
    })

    //delete message
    useEffect(() => {
        socket.on('deleteMessageToClient', message => {
            dispatch(deleteMessage())
            getMessage({ authId: message.recipient, id: message.sender }).unwrap()

        })
        return () => socket.off('deleteMessageToClient') //cancel an event on socket
    })

    //restore message
    useEffect(() => {
        socket.on('restoreMessageToClient', message => {
            getMessage({ authId: message.recipient, id: message.sender }).unwrap()

        })
        return () => socket.off('restoreMessageToClient') //cancel an event on socket
    })

    //check user online/offline
    useEffect(() => {
        socket.emit('checkUserOnline', user)
    }, [socket, user])

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data => {
            data.forEach(item => {
                if (!online.includes(item.id)) {
                    dispatch(setOnline({ onlineUser: item.id }))
                }
            })
        })

        return () => socket.off('checkUserOnlineToMe')
    }, [socket, online])

    useEffect(() => {
        socket.on('checkUserOnlineToClient', id => {
            console.log(id);
            if (!online.includes(id)) {
                dispatch(setOnline({ onlineUser: id }))
            }
        })

        return () => socket.off('checkUserOnlineToClient')
    }, [socket, online])

    //Check user offline
    useEffect(() => {
        socket.on('CheckUserOffline', id => {
            dispatch(setOffline({ offlineUser: id }))
        })

        return () => socket.off('CheckUserOffline')
    }, [socket, online])

    return (
        <></>
    )
}

export default SocketClient