import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFollowMutation, useUnfollowMutation } from '../redux/actions/userAction';

const FollowBtn = ({ user }) => {
    const [followed, setFollowed] = useState()
    const { user: authUser, token } = useSelector((state) => state.auth)

    const id = user._id

    const [follow] = useFollowMutation()
    const [unfollow] = useUnfollowMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        if (authUser?.following?.find(item => item == user._id)) {
            setFollowed(true)
        }
        else {
            setFollowed(false)
        }
    }, [user._id])

    const handleFollow = async () => {

        setFollowed(true)
        await follow({ id, user, authUser })

    }

    const handleUnFollow = async () => {

        setFollowed(false)
        await unfollow({ id, user, authUser })

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