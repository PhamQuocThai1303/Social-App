import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiOutlineShareAlt, AiOutlineBook, AiFillBook } from "react-icons/ai";
import { useLikePostMutation, useUnlikePostMutation } from "../../../redux/actions/postAction";

import CommentModal from "../comments/CommentModal";
import LikeModal from "./LikeModal";

const CardFooter = ({ post }) => {
    const { user } = useSelector((state) => state.auth)
    const userId = user._id

    const [likePost] = useLikePostMutation()

    const [likeModal, setLikeModal] = useState(false)
    const [cmtModal, setCmtModal] = useState(false)
    const [unlikePost] = useUnlikePostMutation()
    const [isLike, setIsLike] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {

        if (post.likes.find((like) => like._id === userId)) {
            setIsLike(true)
        }
    }, [post.likes, userId])

    const handleLikePost = async (e) => {
        e.preventDefault()
        try {
            await likePost({ post, user }).unwrap()
            setIsLike(true)
        } catch (err) {
            console.log(err.data.message);
        }
    }

    const handleUnLikePost = async (e) => {
        e.preventDefault()
        try {
            await unlikePost({ post, user }).unwrap()
            setIsLike(false)
        } catch (err) {
            console.log(err.data.message);
        }
    }

    return (
        <>
            <div className="flex flex-col my-3">
                <div className="flex justify-between px-4 text-2xl items-center">
                    <div className="flex gap-4 cursor-pointer">
                        <div >
                            {isLike
                                ? <AiFillHeart className="text-red-500" onClick={(e) => handleUnLikePost(e)} />
                                : <AiOutlineHeart onClick={(e) => handleLikePost(e)} />
                            }
                        </div>
                        <AiOutlineComment />
                        <AiOutlineShareAlt />
                    </div>
                    <div className="cursor-pointer">
                        <AiOutlineBook />
                    </div>
                </div>
                <div className="flex justify-between px-6 text-2xl items-center">
                    <div className="flex gap-7 cursor-pointer">
                        <small onClick={() => setLikeModal(true)}>{post.likes.length}</small>
                        <small onClick={() => setCmtModal(true)}>{post.comments.length}</small>
                        {/* <small className="cursor-default">0</small> */}
                    </div>
                    {post.comments.length > 2 &&
                        <div onClick={() => setCmtModal(true)}>
                            <small className="text-xs cursor-pointer font-semibold">See all comments</small>
                        </div>
                    }
                </div>
            </div>
            {
                likeModal && <LikeModal likes={post.likes} setLikeModal={setLikeModal} />
            }
            {
                cmtModal && <CommentModal post={post} setCmtModal={setCmtModal} />
            }
        </>
    )
}
export default CardFooter