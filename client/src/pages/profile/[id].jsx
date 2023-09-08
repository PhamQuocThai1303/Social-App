import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetUserQuery } from '../../redux/actions/userAction'
import { useGetUserPostQuery } from '../../redux/actions/postAction'

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Loading from '../../components/alert/Loading'

const Profile = () => {
    const { userId } = useParams()
    const { users, posts } = useSelector((state) => state.user)
    // const { posts } = useSelector((state) => state.homePost)
    const { user } = useSelector((state) => state.auth)
    const { data: foundUser, refetch: refetchGetUser } = useGetUserQuery({ id: userId })
    const { data: userPosts, refetch: refetchGetUserPost } = useGetUserPostQuery({ id: userId })

    const [id, setId] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        setId(userId)
        refetchGetUser()
        refetchGetUserPost()
    }, [userId, user, users])


    return (
        <div>
            {!users
                ? <Loading />
                : <Info id={id} profile={users} auth={user} postLn={userPosts?.posts?.length} />
            }
            {
                !userPosts && !posts && !foundUser
                    ? <Loading />
                    : <Posts id={id} posts={posts} auth={user} /> //do tất cả action như creatCmt, likePost,..., đều áp dụng ở state homePost (do reducer updatePost), nên phải lấy props ở homePost thay vì posts trong state user, điều này sẽ làm cho component Posts load lâu nếu có nhiều dữ liệu do phải find từng post trùng với user, hiện tại chưa tìm được hướng xử lí khác
            }
        </div>
    )
}
export default Profile