import React from "react"
import CommentCard from "./CommentCard"


const CommentDisplay = ({ comment, post }) => {
    return (
        <div className="w-full">

            <CommentCard comment={comment} post={post}>

            </CommentCard>
        </div>
    )
}

export default CommentDisplay