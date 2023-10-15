import React from 'react'

import Avatar from './Avatar'

const UserCard = ({ user, msg }) => {
    if (user) return (
        <div className=" block w-full rounded-lg bg-white hover:bg-[#f3f4f6] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <ul className="w-full flex pl-5 pr-10 py-2 items-center">
                <Avatar className="" avatar={user.avatar} />
                <div className='pl-5'>
                    <li
                        className="text-slate-600 font-normal text-xs sm:text-base dark:border-opacity-50">
                        {user.username}
                    </li>
                    <li
                        className="text-slate-600 font-semibold text-xs sm:text-base dark:border-opacity-50">
                        {user.text && msg
                            ? user.text
                            : user.fullname
                        }
                    </li>
                </div>
            </ul>
        </div>
    )
    return;
}

export default UserCard