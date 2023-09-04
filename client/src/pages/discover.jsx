import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/alert/Loading'
import { useGetDiscoverPostQuery } from '../redux/actions/postAction'
import PostThumb from '../components/PostThumb'

const Discover = ({ userId }) => {
    const { user } = useSelector((state) => state.auth)
    const { posts } = useSelector((state) => state.discover)
    const { data } = useGetDiscoverPostQuery({ id: userId })

    return (
        <div className='my-10 mx-10'>
            {
                !posts && !data && showRep.length <= 0
                    ? <Loading />
                    : <PostThumb posts={posts} />
            }

        </div>
    )
}

export default Discover