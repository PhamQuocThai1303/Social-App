import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import UserCard from "../UserCard"
import { AiOutlineForm } from "react-icons/ai";
import Loading from '../alert/Loading'
import SearchModal from "./SearchModal";

const LeftSide = () => {
    const { user } = useSelector((state) => state.auth)
    const { users, data } = useSelector((state) => state.message)
    const [isSearch, setIsSearch] = useState(false)


    return (
        <div className="">
            <div className=" flex justify-between items-center p-4">
                <h3 className="text-xl">
                    Message
                </h3>
                <AiOutlineForm className="text-2xl cursor-pointer" onClick={() => setIsSearch(true)} />
            </div>
            <div>
                {!user
                    ? <Loading />
                    : <div>
                        {
                            users.map((item) => (
                                <Link key={item._id} className="relative" to={`/message/${item._id}`}>
                                    <UserCard user={item} />
                                    <div className="absolute rounded-full bg-blue-600 w-4 h-4 ml-4 col-span-1 right-0 top-0 mt-2 mr-2" />
                                </Link>
                            ))
                        }
                    </div>
                }

            </div>

            {
                isSearch && <SearchModal setIsSearch={setIsSearch} />
            }
        </div>
    )
}

export default LeftSide