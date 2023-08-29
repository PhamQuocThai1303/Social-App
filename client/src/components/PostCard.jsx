import { useSelector } from "react-redux"
import React, { useState, useEffect } from "react"

import CardBody from "./home/postCard/CardBody"
import CardHeader from "./home/postCard/CardHeader"
import CardFooter from "./home/postCard/CardFooter"
import Comments from "./home/Comments"
import InputComment from "./home/InputComment"

const PostCard = ({ post }) => {
    const { posts } = useSelector((state) => state.homePost)

    return (

        <div className="w-full h-full border-2 rounded my-5">
            <CardHeader post={post} />
            <CardBody images={post.images} content={post.content} />
            <CardFooter post={post} />
            <Comments post={post} />
            <InputComment post={post} />
        </div>

    )
}
export default PostCard