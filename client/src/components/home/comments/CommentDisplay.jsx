import React from "react"
import CommentCard from "./CommentCard"


const CommentDisplay = ({ comment, post, replyCmt }) => {
    return (
        <div className="w-full">

            <CommentCard comment={comment} post={post} commentId={comment._id}> {/*display cac cmt kphai reply */}
                <div className="pl-10">
                    {
                        replyCmt?.map((cmt, index) => ( //display cac reply
                            cmt.reply &&
                            <CommentCard key={index} comment={cmt} post={post} commentId={comment._id} /> //prop cmtId de tat ca cac cmt reply cac cmtreply deu nam cung 1 cot voi cmt chinh
                        ))
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay