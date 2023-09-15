import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createNotify, deleteNotify } from "./redux/reducers/notifyReducer"

const SocketClient = () => {
    const { user } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)

    const dispatch = useDispatch()

    //joinUser
    useEffect(() => {
        socket.emit('joinUser', user?._id)
    }, [socket, user._id])

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

    return (
        <></>
    )
}

export default SocketClient