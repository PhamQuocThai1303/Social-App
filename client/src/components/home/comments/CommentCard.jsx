import Avatar from "../../Avatar"
import { Link } from "react-router-dom"
import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import { AiOutlineHeart, AiFillHeart, AiOutlineEllipsis } from "react-icons/ai";

import { updatePost } from "../../../redux/reducers/postReducer"
import CommentSetting from "./CommentSetting"
import { useLikeCommentMutation, useUnlikeCommentMutation } from "../../../redux/actions/commentAction"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CommentCard = ({ comment, post }) => {
    const { user } = useSelector((state) => state.auth)
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)

    const dispatch = useDispatch()
    const [likeComment] = useLikeCommentMutation()
    const [unlikeComment] = useUnlikeCommentMutation()

    const handleLikeCmt = async (e) => {
        e.preventDefault()

        const newComment = { ...comment, likes: [...comment.likes, user] } //comment with new likes
        const newComments = [
            ...post.comments.map((cmt) => {
                if (cmt._id === newComment._id) cmt = { ...newComment }
                return cmt
            }) //all cmt in post change with newcomment
        ]
        const newPost = { ...post, comments: newComments } //new post change with all cmt

        await likeComment({ cmtId: comment._id, userId: user._id }).unwrap()
        dispatch(updatePost({ newPost }))
        setIsLike(true)

    }

    const handleUnLikeCmt = async (e) => {
        e.preventDefault()

        const newComment = { ...comment, likes: comment.likes.filter(like => like._id !== user._id) }
        const newComments = [
            ...post.comments.map((cmt) => {
                if (cmt._id === newComment._id) cmt = { ...newComment }
                return cmt
            })
        ]
        const newPost = { ...post, comments: newComments }

        await unlikeComment({ cmtId: comment._id, userId: user._id }).unwrap()
        dispatch(updatePost({ newPost }))
        setIsLike(false)

    }

    useEffect(() => {
        setContent(comment.content)
        if (comment.likes.find(like => like._id === user._id)) {
            setIsLike(true)
        }
    }, [comment])

    return (
        <div className="grid grid-cols-12 justify-center ">
            <div className="col-span-1 content-start mx-auto mt-2">
                <Link to={`/profile/${comment.user._id}`} >
                    <Avatar avatar={comment.user.avatar} className="mx-auto flex mt-2" />
                </Link>
            </div>

            <div className="w-[100%] col-span-10">
                <div className="flex gap-2 items-center">
                    <h4 className="font-semibold">{comment.user.username}</h4>
                    <small>
                        {moment(comment?.createdAt).fromNow()}
                    </small>
                    <CommentSetting post={post} comment={comment} />
                </div>

                <div className={`break-words w-full flex ${readMore ? 'flex-col' : 'flex-row'}`}>
                    <span className={`w-full inline-block ${readMore ? 'text-clip' : 'w-[70%] truncate'}`}>{
                        content
                    }</span>
                    {
                        content.length > 40 &&
                        <span onClick={() => setReadMore(!readMore)} className='cursor-pointer text-[#646cff] font-semibold'>
                            {readMore ? ' Hide' : ' More'}
                        </span>
                    }
                </div>

                <div className="flex gap-3 font-bold">
                    <small>
                        {comment.likes.length} likes
                    </small>
                    <small>
                        Reply
                    </small>
                </div>
            </div>

            <div className="col-span-1 mt-2">
                {isLike
                    ? <AiFillHeart className="text-red-500" onClick={(e) => handleUnLikeCmt(e)} />
                    : <AiOutlineHeart onClick={(e) => handleLikeCmt(e)} />
                }
            </div>
        </div>
    )
}

export default CommentCard