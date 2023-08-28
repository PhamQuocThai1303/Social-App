import React, { useState, useEffect } from "react"
import CommentDisplay from "./comments/CommentDisplay"

const Comments = ({ post }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const newCm = post.comments.filter(cm => !cm.reply)
        setComments(newCm.slice(newCm.length - 2)) //lay ra 2 cmt dau tien kphai cmt reply
    }, [post.comments])

    return (
        <div className="w-full  flex flex-col gap-3">
            {
                comments.map((cmt, index) => (
                    <CommentDisplay key={index} comment={cmt} post={post} />
                ))
            }
        </div>
    )
}

export default Comments