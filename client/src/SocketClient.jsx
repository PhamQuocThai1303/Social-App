import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

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


    return (
        <></>
    )
}

export default SocketClient