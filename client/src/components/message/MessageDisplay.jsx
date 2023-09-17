import React from "react"
import Avatar from "../Avatar"

const MessageDisplay = ({ user, isAuth }) => {
    return (
        <div>

            {isAuth
                ? <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi mollitia aliquam ad animi. Commodi voluptates et sequi id. Cum fuga dolorum consequuntur quia atque necessitatibus fugit at, aliquam labore mollitia.
                            </span>
                            <div className="flex justify-end">
                                2023
                            </div>
                        </div>
                    </div>
                    <div className="flex order-2 mb-4">
                        <Avatar avatar={user.avatar} />
                    </div>
                </div>

                : <div className="flex items-end ">
                    <div className="flex order-1 mb-4">
                        <Avatar avatar={user.avatar} />
                    </div>

                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi mollitia aliquam ad animi. Commodi voluptates et sequi id. Cum fuga dolorum consequuntur quia atque necessitatibus fugit at, aliquam labore mollitia.
                            </span>
                            <div>
                                2023
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default MessageDisplay