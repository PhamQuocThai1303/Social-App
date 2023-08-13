import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetUserQuery } from '../../redux/actions/userAction'

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'

const Profile = () => {
    const userId = useParams().userId
    const { users } = useSelector((state) => state.user)
    const { user } = useSelector((state) => state.auth)
    const { data: foundUser, isLoading, isError, error } = useGetUserQuery({ id: userId });

    const [userData, setUserData] = useState()

    const dispatch = useDispatch()

    useEffect(() => {

    }, [userId])

    return (
        <div>
            <Info id={userId} />
            <Posts />
        </div>
    )
}
export default Profile