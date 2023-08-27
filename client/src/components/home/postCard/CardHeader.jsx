import { Fragment } from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import moment from 'moment'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { TfiMoreAlt } from "react-icons/tfi";

import StatusModal from '../../StatusModal';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CardHeader = ({ post }) => {
    const { user } = useSelector((state) => state.auth)
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()

    const handleEditPost = (e) => {
        e.preventDefault()
        setIsEdit(true)
    }

    return (
        <>
            <div className='flex items-center '>
                <div className='m-2'>
                    <Avatar avatar={post?.user?.avatar} />
                </div>
                <div className='flex justify-between w-full'>
                    {/* info */}
                    <div>
                        <h4>
                            <Link to={`/profile/${post?.user?._id}`}>
                                {post?.user?.username}
                            </Link>
                        </h4>
                        <small>
                            {moment(post?.createdAt).fromNow()}
                        </small>
                    </div>

                    {/* setting */}
                    {post.user._id == user._id &&
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <TfiMoreAlt />

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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-[130px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                    onClick={(e) => handleEditPost(e)}
                                                >
                                                    Edit Post
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Delete Post
                                                </a>
                                            )}
                                        </Menu.Item>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    }
                </div>
            </div>
            {
                isEdit && <StatusModal post={post} setIsEdit={setIsEdit} />
            }
        </>
    )
}
export default CardHeader