import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetUserQuery } from '../../redux/actions/userAction'

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Loading from '../../components/alert/Loading'

const Profile = () => {
    const userId = useParams().userId
    const { users } = useSelector((state) => state.user)
    const { user } = useSelector((state) => state.auth)
    const { data: foundUser, isLoading, isError, error } = useGetUserQuery({ id: userId })

    const dispatch = useDispatch()

    useEffect(() => {

    }, [userId, user, users])


    return (
        <div>
            {!users
                ? <Loading />
                : <Info id={userId} profile={users} auth={user} />
            }
            <Posts />
        </div>
    )
}
export default Profile