import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../redux/reducers/userReducer';
import { followingUser, unFollowingUser } from '../redux/reducers/authReducer';

const FollowBtn = ({ user }) => {
    const [followed, setFollowed] = useState(false)
    const { user: authUser, token } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        if (authUser?.following?.find(item => item._id === user._id)) {
            setFollowed(true)
        }
    }, [])

    const handleFollow = () => {
        setFollowed(true)
        dispatch(followUser({ user, authUser })) //update followers cua profile (khac authUser)
        dispatch(followingUser({ user, authUser }))// update following cua authUser
    }

    const handleUnFollow = () => {
        setFollowed(false)
        dispatch(unFollowUser({ user, authUser }))
        dispatch(unFollowingUser({ user, authUser }))
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