import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiOutlineShareAlt, AiOutlineBook, AiFillBook } from "react-icons/ai";
import { useLikePostMutation, useUnlikePostMutation } from "../../../redux/actions/postAction";
import { useSavePostMutation, useUnsavePostMutation } from "../../../redux/actions/postAction";
import { useCreateNotifyMutation, useDeleteNotifyMutation } from "../../../redux/actions/notifyAction";

import CommentModal from "../comments/CommentModal";
import LikeModal from "./LikeModal";
import ShareModal from "./ShareModal";

import { BASE_URL } from '../../../utils/config'

const CardFooter = ({ post }) => {
    const { user } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)

    const userId = user._id

    const [likePost] = useLikePostMutation()
    const [unlikePost] = useUnlikePostMutation()
    const [savePost] = useSavePostMutation()
    const [unsavePost] = useUnsavePostMutation()

    const [createNotify] = useCreateNotifyMutation()
    const [deleteNotify] = useDeleteNotifyMutation()


    const [likeModal, setLikeModal] = useState(false)
    const [cmtModal, setCmtModal] = useState(false)
    const [shareModal, setShareModal] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [saved, setSaved] = useState(false)

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

            if (post.user._id !== user._id) { //dont send noti to authUser
                //socket
                const newPost = { ...post, likes: [...post.likes, user] }
                socket.emit('likePost', newPost) //handle likePost event on socket event 

                //Notify
                const notify = {
                    userId: user._id,
                    postId: post._id,
                    text: 'like your post.',
                    recipients: [post.user._id],
                    url: `/post/${post._id}`,
                    content: post.content,
                }
                const { notify: res } = await createNotify({ notify }).unwrap()

                //socket
                socket.emit('createNotify', { //create notify
                    ...res,
                    user: {
                        username: user.username,
                        avatar: user.avatar
                    }
                })
            }

            setIsLike(true)
        } catch (err) {
            console.log(err);
        }
    }

    const handleUnLikePost = async (e) => {
        e.preventDefault()
        try {
            await unlikePost({ post, user }).unwrap()

            if (post.user._id !== user._id) {//dont send noti to authUser
                //socket
                const newPost = { ...post, likes: post.likes.filter(item => item._id !== user._id) }
                socket.emit('unLikePost', newPost)//handle unlikePost event on socket event

                // Notify
                const notify = {
                    postId: post._id,
                    recipients: user.followers,
                    url: `/post/${post._id}`,
                }

                const { notify: res } = await deleteNotify({ notify }).unwrap()

                //socket
                socket.emit('deleteNotify', {//deleteNotify
                    ...res,
                    user: {
                        username: user.username,
                        avatar: user.avatar
                    }
                })
            }

            setIsLike(false)
        } catch (err) {
            console.log(err.data.message);
        }
    }

    useEffect(() => {
        if (user) {
            if (user.saved.find((save) => save === post._id)) {
                setSaved(true)
            }
        }
    }, [user, userId, saved])

    const handleSavePost = async (e) => {
        e.preventDefault()
        try {
            await savePost({ post, user }).unwrap()
            setSaved(true)
        } catch (err) {
            console.log(err.data.message);
        }
    }

    const handleUnsavePost = async (e) => {
        e.preventDefault()
        try {
            await unsavePost({ post, user }).unwrap()
            setSaved(false)
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
                        <AiOutlineShareAlt onClick={() => setShareModal(true)} />
                    </div>
                    <div className="cursor-pointer">
                        {saved
                            ? <AiFillBook className="text-yellow-300" onClick={(e) => handleUnsavePost(e)} />
                            : <AiOutlineBook onClick={(e) => handleSavePost(e)} />
                        }
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
            {
                shareModal && <ShareModal url={`${BASE_URL}/post/${post._id}`} setShareModal={setShareModal} />
            }
        </>
    )
}
export default CardFooter