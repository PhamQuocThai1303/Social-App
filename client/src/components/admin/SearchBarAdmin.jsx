import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchUserMutation } from '../../redux/actions/userAction'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard'
import { AiOutlineSearch } from "react-icons/ai";

const SearchBarAdmin = ({ setAllUser }) => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [tempSearch, setTempSearch] = useState("")

    const [searchUser, { isLoading }] = useSearchUserMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        if (search !== tempSearch) {
            if (search === "") setUsers([])

            else {
                searchUser({ "username": `${search}`, isAdmin: true })
                    .then((res) => setUsers(res.data.users))
                    .catch(err => {
                        dispatch(setError(err.data.message))
                    })
            }
            setTempSearch(search)
        }
    }, [search, users])

    const handleChangeInput = (e) => {
        e.preventDefault()
        const { value } = e.target

        if (e.key === 'Backspace' || value === search) {
            setSearch(value);
        }
        else if (value === "") {
            setSearch("")
        }
        else {
            setSearch(value.toLowerCase().replace(/ /g, ''))
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setAllUser(users)
        setUsers([])
        setSearch("")
    }

    return (

        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input type="search" id="default-search" className="block sm:w-full w-[200%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for usernames"
                    onInput={(e) => handleChangeInput(e)}
                    value={search}
                />
                <div className=' w-[200%] sm:w-[35%] flex flex-col mt-2 fixed z-50'>
                    {
                        users?.map(user => (
                            <span
                                key={user._id}
                                to={`/profile/${user._id}`}
                                className=''
                                onClick={(e) => handleSubmit(e)}
                            >
                                <UserCard user={user} />
                            </span>
                        ))
                    }
                </div>

            </div>
        </form>

    )
}

export default SearchBarAdmin