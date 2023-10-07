import React from "react"
import Avatar from "../Avatar"
import MessageSetting from "./MessageSetting"

const MessageDisplay = ({ user, isAuth, msg, data }) => {

    return (
        <div>

            {isAuth
                //your message
                ? <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div className="flex flex-col items-end ">
                            {msg.recall == false //check if it recalled
                                ? <>
                                    {msg.text &&
                                        <div>
                                            <MessageSetting data={data} msg={msg} />
                                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ml-2">
                                                {msg.text}
                                            </span>
                                        </div>

                                    }
                                    {msg.images &&
                                        msg.images.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <MessageSetting data={data} msg={msg} />
                                                <img src={item.url}
                                                    alt="avatar"
                                                    className='sm:max-w-[250px] sm:max-h-[250px] max-w-[200px] max-h-[200px] object-contain border-2 ml-2'
                                                />
                                            </div>
                                        ))

                                    }
                                </>
                                : <div>
                                    <MessageSetting data={data} msg={msg} />
                                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ml-2 underline italic">
                                        Message has been revoked
                                    </span>
                                </div>
                            }
                            <div className="flex justify-end">
                                {new Date(msg.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className="flex order-2 mb-4">
                        <Avatar avatar={user.avatar} />
                    </div>
                </div>

                //other message
                : <div className="flex items-end">
                    <div className="flex order-1 mb-4">
                        <Avatar avatar={user.avatar} />
                    </div>

                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div className="flex flex-col items-start">
                            {msg.recall == false
                                ? <>
                                    {msg.text &&
                                        <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 rounded-bl-none">
                                            {msg.text}
                                        </span>

                                    }
                                    {msg.images &&
                                        msg.images.map((item, index) => (
                                            <div key={index}>
                                                <img src={item.url}
                                                    alt="avatar"
                                                    className='sm:max-w-[250px] sm:max-h-[250px] max-w-[200px] max-h-[200px] object-contain border-2 '
                                                />
                                            </div>
                                        ))

                                    }
                                </>
                                : <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 rounded-bl-none underline italic">
                                    Message has been revoked
                                </span>
                            }
                            <div className="flex justify-end">
                                {new Date(msg.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default MessageDisplay