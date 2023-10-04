import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AiOutlineEllipsis } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux"
import React, { Fragment } from "react"
import { toast } from 'react-toastify';

import { useDeleteCommentMutation } from '../../../redux/actions/commentAction';

import { updatePost } from '../../../redux/reducers/postReducer';
import { updateUserPost } from '../../../redux/reducers/userReducer';
import { updateSinglePost } from '../../../redux/reducers/singlePostReducer';
import { useDeleteNotifyMutation } from '../../../redux/actions/notifyAction';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CommentSetting = ({ post, comment }) => {
    const { user } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)

    const dispatch = useDispatch()
    const [deleteComment] = useDeleteCommentMutation()
    const [deleteNotify] = useDeleteNotifyMutation()

    const handleDelete = async (e) => {
        e.preventDefault()
        const deleteReplyArr = [...post.comments.filter(cmt => cmt.reply === comment._id), comment] //get all reply cmt of delete cmt

        const newPost = {
            ...post,
            comments: post.comments.filter(cmt => !deleteReplyArr.find(item => cmt._id === item._id)) //get all cmt which not in deleteReplyArr
        }

        dispatch(updatePost({ newPost }))
        dispatch(updateUserPost({ newPost }))
        dispatch(updateSinglePost({ newPost }))



        try {
            deleteReplyArr.forEach(async (cmt) => { //delete het cmt trong deleteReplyCmt
                await deleteComment({ cmtId: cmt._id, userId: cmt.user }).unwrap()

                if (post.user._id !== user._id) { //dont send noti to authUser
                    //socket
                    socket.emit('deleteComment', newPost)

                    //Notify
                    const notify = {
                        cmtId: cmt._id,
                        text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
                        url: `/post/${post._id}`,
                    }
                    const { notify: resNoti } = await deleteNotify({ notify }).unwrap()
                    //socket
                    socket.emit('deleteNotify', {
                        ...resNoti,
                        user: {
                            username: user.username,
                            avatar: user.avatar
                        }
                    })
                }
            })


            toast.success("Comment Deleted!")
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            {comment.user._id == user._id &&
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <AiOutlineEllipsis />

                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-[130px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={(e) => handleDelete(e)}
                                        >
                                            Delete
                                        </a>
                                    )}
                                </Menu.Item>

                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            }
        </>
    )
}

export default CommentSetting