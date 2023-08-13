import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchUserMutation } from '../../redux/actions/userAction'
import { setError } from '../../redux/reducers/notifyReducer'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard'

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [tempSearch, setTempSearch] = useState("")

    const [searchUser, { isLoading }] = useSearchUserMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        if (search !== tempSearch) {
            if (search === "") setUsers([])

            else {
                searchUser({ "username": `${search}` })
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


    const handleSubmit = () => {
        setUsers([])
        setSearch("")
    }

    return (

        <form className="w-full" onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block sm:w-full w-[200%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for friends"
                    onInput={handleChangeInput}
                    value={search}
                />
                <div className='block w-[200%] sm:w-[35%] flex flex-col mt-2 fixed z-50'>
                    {
                        users?.map(user => (
                            <Link
                                key={user._id}
                                to={`/profile/${user._id}`}
                                className=''
                                onClick={handleSubmit}
                            >
                                <UserCard user={user} />
                            </Link>
                        ))
                    }
                </div>

            </div>
        </form>

    )
}

export default SearchBar