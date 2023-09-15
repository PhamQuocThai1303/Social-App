import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import moment from 'moment'

import Avatar from "../Avatar"

const NotifyModal = () => {
    const { data } = useSelector((state) => state.notify)

    return (
        <div className="flex flex-col">
            <div className="p-4">
                <div className="text-2xl pb-2">Notification</div>
                {data.length > 0 &&
                    <div className="flex gap-2">
                        <button className="bg-red-500 text-white">Delete All</button>
                        <button className="bg-blue-500 text-white">Read All</button>
                    </div>
                }
            </div>
            {
                data.length === 0 &&
                <div className="text-3xl p-2 border-t-2">You have no notify!</div>
            }
            <div className="overflow-y-scroll max-h-[350px] w-full rounded-lg ">
                {
                    data?.map((item, index) => (
                        <Link key={index} to={`${item.url}`} className="grid grid-cols-6 p-2 border-2 items-center min-h-[90px] ">
                            <Avatar avatar={item.user.avatar} className="col-span-1" />

                            <div className="flex flex-col  ml-2 col-span-4">
                                <div className="flex gap-2 items-center">
                                    <span className="text-lg text-black">{item.user.username}</span>
                                    <span className="text-gray-400 text-sm">{item.text}</span>
                                </div>
                                {item.content && <span>{item.content.slice(0, 15)}...</span>}
                                <small className="">
                                    {moment(data?.createdAt).fromNow()}
                                </small>
                            </div>

                            {
                                !data.isRead && <div className="rounded-full bg-blue-600 w-4 h-4 ml-4 col-span-1" />
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default NotifyModal