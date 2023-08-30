import React, { useState, useEffect } from "react"

import PostThumb from "../PostThumb"
import PostCard from "../PostCard"

const Posts = ({ id, posts, auth }) => {
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        if (id === auth._id) {
            let newPosts = posts?.filter((post) => post?.user?._id == id)
            console.log(newPosts);
            setUserPosts(newPosts)
        }
        else {
            let newPosts = posts?.filter((post) => post?.user?._id == id)
            setUserPosts(newPosts)
        }
    }, [id, posts, auth])

    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 ">
                <div className="flex w-full sm:grid sm:grid-cols-12 flex-col items-center justify-center">
                    <div className="sm:col-start-2 sm:col-span-10 w-full">
                        {
                            userPosts?.map((post, index) => (
                                <PostCard key={post._id} post={post} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Posts