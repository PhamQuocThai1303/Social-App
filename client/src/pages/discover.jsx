import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/alert/Loading'
import { useGetDiscoverPostQuery } from '../redux/actions/postAction'
import PostThumb from '../components/PostThumb'

const Discover = ({ userId }) => {
    const { user } = useSelector((state) => state.auth)
    const { posts } = useSelector((state) => state.discover)
    const { data } = useGetDiscoverPostQuery({ id: userId })

    useEffect(() => {
        // console.log(posts);
    }, [user, posts])

    return (
        <div>
            {
                !posts && !data
                    ? <Loading />
                    : <PostThumb posts={posts} />
            }
        </div>
    )
}

export default Discover