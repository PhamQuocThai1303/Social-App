import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AiOutlineEllipsis } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux"
import React, { Fragment } from "react"
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom"
import { useDeleteMessageMutation, useGetMessageMutation, useRestoreMessageMutation } from '../../redux/actions/messageAction';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MessageSetting = ({ data, msg }) => {
    const { user } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)

    const { userId } = useParams()
    const dispatch = useDispatch()
    const [deleteMessage] = useDeleteMessageMutation()
    const [getMessage] = useGetMessageMutation()
    const [restoreMessage] = useRestoreMessageMutation()

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!data) return;

        const message = {
            sender: user?._id,
            recipient: userId,
            text: msg.text,
            images: msg.images
        }


        if (window.confirm('Do you want to delete?')) {
            await deleteMessage({ id: msg._id, authId: user._id }).unwrap()
            await getMessage({ authId: user?._id, id: userId }).unwrap()

            socket.emit('deleteMessage', message)
        }
    }

    const handleRestore = async (e) => {
        e.preventDefault()
        if (!data) return;

        const message = {
            sender: user?._id,
            recipient: userId,
            text: msg.text,
            images: msg.images
        }


        if (window.confirm('Do you want to restore this message?')) {
            await restoreMessage({ id: msg._id, authId: user._id }).unwrap()
            await getMessage({ authId: user?._id, id: userId }).unwrap()

            socket.emit('restoreMessage', message)
        }
    }

    return (
        <>
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
                    <Menu.Items className="absolute right-0 z-10 mt-1 w-[50px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {msg.recall == false
                                ? <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-2 py-1 text-xs'
                                            )}
                                            onClick={(e) => handleDelete(e)}
                                        >
                                            Delete
                                        </a>
                                    )}
                                </Menu.Item>
                                : <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-2 py-1 text-xs'
                                            )}
                                            onClick={(e) => handleRestore(e)}
                                        >
                                            Restore
                                        </a>
                                    )}
                                </Menu.Item>
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default MessageSetting