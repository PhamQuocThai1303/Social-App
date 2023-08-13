import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setError } from '../../redux/reducers/notifyReducer'

import { useGetUserQuery } from '../../redux/actions/userAction'

const Info = ({ id, user }) => {

    // useEffect(() => {
    //     if (foundUser) {
    //         if (userId === user._id) {
    //             setUserData(user)
    //             console.log(userData);
    //         }
    //         else {
    //             setUserData(foundUser)
    //             console.log(userData);
    //         }
    //     }
    // }, [userId, userData])

    const check = async () => {
        setUserData(foundUser)
        if (userData) console.log(userData);
    }

    return (
        <>
            <button onClick={check}>check</button>
            {/* {userData.map(user => (
                <div className="" key={user._id}>
                    <div className="p-8 bg-white mt-20">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">{user.followers.length}</p>
                                    <p className="text-gray-400"> Followers</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">{user.following.length}</p>
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
                                        src={`${user.avatar}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                                <button
                                    className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    Edit Profile
                                </button>

                                <button
                                    className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    Message
                                </button>
                            </div>
                        </div>

                        <div className="mt-20 text-center border-b pb-12">
                            <h1 className="text-4xl font-medium text-gray-700">{user.fullname}, <span className="font-light text-gray-500">{user.gender}</span></h1>
                            <p className="font-light text-gray-600 mt-3">{user.address}</p>

                            <p className="mt-8 text-gray-500">{user.mobile}</p>
                            <p className="mt-2 text-gray-500">{user.website}</p>
                        </div>

                        <div className="mt-12 flex flex-col justify-center">
                            <p className="text-gray-600 text-center font-light lg:px-16">{user.story}</p>

                        </div>

                    </div>
                </div>
            ))
            } */}
        </>
    )
}
export default Info