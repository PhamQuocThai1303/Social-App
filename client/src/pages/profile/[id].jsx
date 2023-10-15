import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetUserQuery } from '../../redux/actions/userAction'
import { useGetUserPostQuery } from '../../redux/actions/postAction'

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import Loading from '../../components/alert/Loading'

const Profile = () => {
    const { userId } = useParams()
    const { users, posts } = useSelector((state) => state.user)
    const { user } = useSelector((state) => state.auth)
    const { data: foundUser, refetch: refetchGetUser } = useGetUserQuery({ id: userId })
    const { data: userPosts, refetch: refetchGetUserPost } = useGetUserPostQuery({ id: userId })


    const [id, setId] = useState("")
    const [saveTab, setSaveTab] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setId(userId)
    }, [userId, user, users])

    useEffect(() => {
        refetchGetUser()
        refetchGetUserPost()
    }, [userId, user])


    return (
        <div>
            {!users
                ? <Loading />
                : <Info id={id} profile={users} auth={user} postLn={userPosts?.posts?.length} />
            }

            {
                userId === user._id &&
                <div className="ml-6 flex justify-center  border-b pb-6">
                    <div className="flex gap-8 sm:gap-16">
                        <button
                            className={!saveTab ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' + 'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                            }
                            onClick={() => setSaveTab(false)}
                        >
                            Post
                        </button>
                        <button
                            className={saveTab ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' + 'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                            }
                            onClick={() => setSaveTab(true)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            }

            {
                !userPosts && !posts && !foundUser
                    ? <Loading />
                    : <>
                        {
                            saveTab
                                ? <Saved id={id} auth={user} />
                                : <Posts id={id} posts={posts} auth={user} />
                        }
                    </>
            }
        </div>
    )
}
export default Profile