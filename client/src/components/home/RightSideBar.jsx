import React from "react"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import UserCard from "../UserCard"
import FollowBtn from "../FollowBtn"
import Loading from "../alert/Loading"

import { AiOutlineReload } from "react-icons/ai";

const RightSideBar = ({ refetch }) => {
    const { user } = useSelector((state) => state.auth)
    const { users } = useSelector((state) => state.suggestion)

    return (
        <div>
            <UserCard user={user} />

            <div className="flex justify-around my-5 items-center">
                <h4 className="text-slate-400 font-semibold">Suggestions for you</h4>
                <button className="p-1">
                    <AiOutlineReload onClick={() => refetch()} className="text-2xl cursor-pointer" />
                </button>
            </div>

            {
                !user && !users
                    ? <Loading />
                    : <div>
                        {
                            users.map((item, index) => (
                                <div key={item._id} className="grid pb-2">
                                    <Link to={`/profile/${item._id}`}>
                                        <UserCard user={item} />
                                    </Link>
                                    <FollowBtn user={item} />
                                </div>
                            ))
                        }
                    </div>
            }

            <div className="my-2" >
                <div >
                    Powered by PhamQuocThai
                </div>

                <small>
                    &copy; 2023 T-CONNECT FROM PhjQsThs
                </small>
            </div>
        </div>
    )
}

export default RightSideBar