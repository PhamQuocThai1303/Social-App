import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './alert/Loading';
const PostThumb = ({ posts }) => {

    useEffect(() => {
    }, [posts])
    return (
        <>
            {!posts
                ? <Loading />
                : <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                    {
                        posts?.map((post, index) => (
                            <div key={index} className='h-[300px] sm:h-[400px] border-2 rounded-none'>
                                <img

                                    className="object-cover object-center flex h-full items-center justify-center bg-white"
                                    src={post?.images[0]?.url}
                                    alt=""
                                />
                            </div>
                        ))
                    }

                </div>
            }
        </>
    )
}

export default PostThumb