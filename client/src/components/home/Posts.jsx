import React, { useState, useEffect } from "react"
import PostCard from "../PostCard"

const Posts = ({ posts }) => {
    const [homePosts, setHomePosts] = useState([])

    useEffect(() => {

        setHomePosts(posts)

    }, [posts])

    return (
        <div className="flex w-full sm:grid sm:grid-cols-12 flex-col items-center justify-center">
            <div className="sm:col-start-2 sm:col-span-10 w-full">
                {
                    homePosts?.map((post, index) => (

                        <PostCard key={post._id} post={post} />

                    ))
                }
            </div>
        </div>
    )
}

export default Posts