import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSend } from "react-icons/ai";
import Icons from '../Icons';

import { updatePost } from '../../redux/reducers/postReducer';
import { updateUserPost } from '../../redux/reducers/userReducer';
import { useCreateCommentMutation } from '../../redux/actions/commentAction';
import { updateSinglePost } from '../../redux/reducers/singlePostReducer';
import { useCreateNotifyMutation } from '../../redux/actions/notifyAction';

import { toast } from 'react-toastify';

const InputComment = ({ children, post, onReply, setOnReply }) => {
    const { user } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)

    const [content, setContent] = useState('')
    const [createComment] = useCreateCommentMutation()
    const [createNotify] = useCreateNotifyMutation()

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) {
            if (setOnReply) return setOnReply(false);
            return;
        }

        setContent('')

        const newComment = {
            content,
            likes: [],
            user: user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }

        const newPost = { ...post, comments: [...post.comments, newComment] }

        try {
            const { newComment: res } = await createComment({ ...newComment, postId: post?._id, postUserId: post?.user?._id, userId: user?._id }).unwrap()
            const newData = { ...res, user: user } //newComment
            const newPost = { ...post, comments: [...post.comments, newData] }
            dispatch(updatePost({ newPost }))
            dispatch(updateUserPost({ newPost }))
            dispatch(updateSinglePost({ newPost }))

            if (post.user._id !== user._id) {//dont send noti to authUser
                //socket 
                socket.emit('createComment', newPost)

                // Notify
                const notify = {
                    userId: user._id,
                    cmtId: res._id,
                    text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                    recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
                    url: `/post/${post._id}`,
                    content: post.content,
                }
                const { notify: resNoti } = await createNotify({ notify }).unwrap()
                //socket
                socket.emit('createNotify', {
                    ...resNoti,
                    user: {
                        username: user.username,
                        avatar: user.avatar
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }


        if (setOnReply) return setOnReply(false);
    }

    useEffect(() => {
        // if (onReply) setContent(children)
    }, [onReply])

    return (

        <form onSubmit={handleSubmit} className="flex items-center px-3 py-2 rounded-lg dark:bg-gray-700">
            <label htmlFor="chat" className="sr-only"> Your Comment</label>


            <div className=" flex items-center mx-2 text-clip p-1 w-full max-h-[120px] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                {children}

                <input id="chat" type='text' className='w-full border-none focus:ring-white' placeholder="Your message..." value={content} onChange={e => setContent(e.target.value)} />
            </div>

            <div><Icons content={content} setContent={setContent} /></div>

            <button type='submit' className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 ml-1">
                <AiOutlineSend className='text-2xl' />
                <span className="sr-only">Send message</span>
            </button>

        </form>
    )
}

export default InputComment