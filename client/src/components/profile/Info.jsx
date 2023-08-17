import React, { useState, useEffect } from 'react'
import Loading from '../alert/Loading'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'

const Info = ({ id, profile, auth }) => {
    const [userData, setUserData] = useState({})
    const [isProfile, setIsProfile] = useState()
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (id === auth._id) {
            setUserData(auth)
            setIsProfile(true)
        }
        else {
            const newUser = profile?.filter((user) => user._id == id)
            setUserData(newUser[0])
            setIsProfile(false)
        }
    }, [id, profile, auth])

    if (!userData) return <Loading />

    return (
        <>
            <div className="" key={userData?._id}>
                <div className="p-8 bg-white mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{userData?.followers?.length}</p>
                                <p className="text-gray-400"> Followers</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{userData?.following?.length}</p>
                                <p className="text-gray-400">Following</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">89</p>
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

                        <div className="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">
                            {isProfile
                                ? <button
                                    className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    Edit Profile
                                </button>

                                : <FollowBtn />
                            }
                            {!isProfile
                                && <button
                                    className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    Message
                                </button>
                            }
                        </div>
                    </div>

                    <div className="mt-20 text-center border-b pb-4">
                        <h1 className="text-4xl font-medium text-gray-700">{userData?.fullname}, <span className="font-light text-gray-500">{userData?.gender}</span></h1>
                        <p className="font-sans font-bold text-lg text-gray-600 mt-3">{userData?.address}</p>

                        <p className="mt-4 text-gray-500">{userData?.mobile}</p>
                        <p className="mt-2 text-gray-500">{userData?.website}</p>
                    </div>

                    <div className="mt-4 font-mono flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">{userData?.story}</p>

                    </div>

                </div>
            </div>

            {
                isEdit && <EditProfile user={userData} setIsEdit={setIsEdit} userAva={userData?.avatar} />
            }

        </>
    )
}
export default Info