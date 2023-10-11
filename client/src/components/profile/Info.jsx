import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineShareAlt } from "react-icons/ai";
import Loading from '../alert/Loading'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import FollowerModal from './FollowerModal'
import FollowingModal from './FollowingModal'
import { BASE_URL } from '../../utils/config'
import { useDispatch } from 'react-redux'

import { addUser } from '../../redux/reducers/messageReducer';

import { toast } from 'react-toastify';

const Info = ({ id, profile, auth, postLn }) => {
    const [userData, setUserData] = useState({})
    const [isProfile, setIsProfile] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [showFollower, setShowFollower] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (id === auth._id) {
            let newUser = profile?.find((user) => user._id == id)
            setUserData(newUser)
            setIsProfile(true)
        }
        else {
            let newUser = profile?.filter((user) => user._id == id)
            setUserData(newUser[0])
            setIsProfile(false)
        }
    }, [id, profile, auth])

    const handleMessage = (user) => {
        dispatch(addUser({ user }))
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/profile/${userData?._id}`)
        toast.success("Copied profile link")
    }

    if (!userData) return <Loading />

    return (
        <>
            <div className="" key={userData?._id}>
                <div className="p-8 bg-white mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first sm:mt-20 mt-10 md:mt-0">
                            <div className='cursor-pointer' onClick={() => setShowFollower(true)}>
                                <p className="font-bold text-gray-700 text-xl">{userData?.followers?.length}</p>
                                <p className="text-gray-400"> Followers</p>
                            </div>
                            <div className='cursor-pointer' onClick={() => setShowFollowing(true)}>
                                <p className="font-bold text-gray-700 text-xl">{userData?.following?.length}</p>
                                <p className="text-gray-400">Following</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{postLn}</p>
                                <p className="text-gray-400">Post</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-40 h-40 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <img
                                    className="h-40 w-40 rounded-full"
                                    src={`${userData?.avatar}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="space-x-8 flex justify-center sm:mt-32 mt-24 md:mt-0 md:justify-center">
                            {isProfile
                                ? <button
                                    className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    Edit Profile
                                </button>

                                : <FollowBtn user={userData} />
                            }
                            {!isProfile
                                && <Link
                                    className="text-white flex items-center py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    to={`/message/${id}`}
                                    onClick={() => handleMessage(userData)}
                                >
                                    Message
                                </Link>
                            }
                            <button onClick={handleCopyLink}
                                className="text-white py-2 sm:px-4 px-2 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 text-2xl"
                            >
                                <AiOutlineShareAlt />
                            </button>
                        </div>
                    </div>

                    <div className="sm:mt-20 mt-10 text-center pb-4">
                        <h1 className="text-4xl font-medium text-gray-700">{userData?.fullname}, <span className="font-light text-gray-500">{userData?.gender}</span></h1>
                        <p className="font-sans font-bold text-lg text-gray-600 mt-3">{userData?.address}</p>

                        <p className="mt-4 text-gray-500">{userData?.mobile}</p>
                        <p className="mt-2 text-gray-500">{userData?.website}</p>
                    </div>

                    <div className="mt-4 font-mono flex flex-col justify-center border-b pb-4">
                        <p className="text-gray-600 text-center font-light lg:px-16">{userData?.story}</p>

                    </div>

                </div>
            </div>

            {
                isEdit && <EditProfile user={userData} setIsEdit={setIsEdit} userAva={userData?.avatar} />
            }

            {
                showFollower && <FollowerModal user={userData} setShowFollower={setShowFollower} />
            }

            {
                showFollowing && <FollowingModal user={userData} setShowFollowing={setShowFollowing} />
            }
        </>
    )
}
export default Info