import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/alert/Loading'
import { useGetDiscoverPostQuery } from '../redux/actions/postAction'
import PostThumb from '../components/PostThumb'

const Discover = ({ userId }) => {
    const { posts } = useSelector((state) => state.discover)
    const { data } = useGetDiscoverPostQuery({ id: userId })

    const [discoverPost, setDiscoverPost] = useState([]);

    useEffect(() => {
        if (posts) setDiscoverPost(posts)
    }, [posts, data])

    return (
        <div className='my-10 mx-10'>
            {
                discoverPost.length == 0
                    ? <Loading />
                    : <PostThumb posts={discoverPost} />
            }

        </div>
    )
}

export default Discover