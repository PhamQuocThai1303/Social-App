import React, { useState, useEffect } from "react"
import UserCard from "../UserCard"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import MessageDisplay from "./MessageDisplay"
import { TfiTrash } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";

const RightSide = () => {
    const { user } = useSelector((state) => state.auth)
    const { users, data } = useSelector((state) => state.message)

    const dispatch = useDispatch()

    const { userId } = useParams()
    const [curUser, setCurUser] = useState([])
    const [text, setText] = useState("")

    useEffect(() => {
        const newUser = users.find(user => user._id === userId)
        if (newUser) setCurUser(newUser)
    }, [userId, users])

    return (
        <div className=" h-full flex flex-col justify-between ">
            <div className="flex relative">
                <UserCard user={curUser} />
                <TfiTrash className="absolute w-6 h-6 right-0 mt-4 mr-10 cursor-pointer" />
            </div>


            <div className="grow flex flex-col justify-end space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                <div>
                    <div className="my-4">
                        <MessageDisplay user={curUser} isAuth={false} />
                    </div>

                    <div className="my-2">
                        <MessageDisplay user={user} isAuth={true} />
                    </div>
                </div>
            </div>

            <form className="justify-self-end">
                <div className=" flex items-center text-clip p-1 w-full max-h-[120px] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <input id="chat" type='text' className='w-full border-none focus:ring-white' placeholder="Your message..." value={text} onChange={e => setText(e.target.value)} />

                    <button type='submit' className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <AiOutlineSend className='text-2xl' />
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RightSide