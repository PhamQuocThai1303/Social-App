import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFollowMutation, useUnfollowMutation } from '../redux/actions/userAction';
import { useCreateNotifyMutation, useDeleteNotifyMutation } from '../redux/actions/notifyAction';

const FollowBtn = ({ user }) => {
    const [followed, setFollowed] = useState()
    const { user: authUser, token } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)

    const id = user._id

    const [follow] = useFollowMutation()
    const [unfollow] = useUnfollowMutation()
    const [createNotify] = useCreateNotifyMutation()
    const [deleteNotify] = useDeleteNotifyMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        if (authUser?.following?.find(item => item._id == user._id)) {

            setFollowed(true)
        }
        else {
            setFollowed(false)
        }
    }, [authUser, user])

    const handleFollow = async () => {

        setFollowed(true)
        await follow({ id, user, authUser })

        //socket
        const newUser = { ...user, followers: [...user.followers, authUser] }
        socket.emit('follow', newUser)

        // Notify
        const notify = {
            userId: authUser._id,
            text: 'just followed you.',
            recipients: [newUser._id],
            url: `/profile/${authUser._id}`,
        }
        const { notify: resNoti } = await createNotify({ notify }).unwrap()
        //socket
        socket.emit('createNotify', {
            ...resNoti,
            user: {
                username: authUser.username,
                avatar: authUser.avatar
            }
        })
    }

    const handleUnFollow = async () => {

        setFollowed(false)
        await unfollow({ id, user, authUser })

        //socket
        const newUser = { ...user, followers: user.followers.filter(item => item._id !== authUser._id) }
        socket.emit('unfollow', newUser)

        // Notify
        const notify = {
            userId: authUser._id,
            text: 'just followed you.',
            recipients: [newUser._id],
            url: `/profile/${authUser._id}`,
        }
        const { notify: resNoti } = await deleteNotify({ notify }).unwrap()
        //socket
        socket.emit('deleteNotify', {
            ...resNoti,
            user: {
                username: authUser.username,
                avatar: authUser.avatar
            }
        })
    }


    return (
        <>
            {
                followed
                    ? <button
                        className="text-white py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        onClick={handleUnFollow}
                    >
                        Unfollow
                    </button>
                    : <button
                        className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        onClick={handleFollow}
                    >
                        Follow
                    </button>
            }
        </>
    )
}

export default FollowBtn