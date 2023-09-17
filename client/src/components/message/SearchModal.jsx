import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchUserMutation } from "../../redux/actions/userAction"
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from 'react-router-dom'
import UserCard from '../UserCard'
import { addUser } from '../../redux/reducers/messageReducer';


const SearchModal = ({ setIsSearch }) => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [tempSearch, setTempSearch] = useState("")

    const dispatch = useDispatch()
    const [searchUser] = useSearchUserMutation()

    useEffect(() => {
        if (search !== tempSearch) {
            if (search === "") setUsers([])

            else {
                searchUser({ "username": `${search}` })
                    .then((res) => setUsers(res.data.users))
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

    //submit and add user
    const handleSubmit = (user) => {
        setUsers([])
        setSearch("")
        dispatch(addUser({ user }))
        setIsSearch(false)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div id="default-modal" data-modal-show="true" aria-hidden="true" className="bg-gray-200/50 overflow-x-hidden overflow-y-auto fixed w-full h-full sm:h-full top-0 left-0 right-0 sm:inset-0 z-50 sm:flex sm:justify-center sm:items-center">
                <div className="relative flex justify-center top-16 sm:-top-20 w-full max-w-xl px-4">

                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow relative w-full dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                Add User Message
                            </h3>

                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal" onClick={() => setIsSearch(false)}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        {/* Search bar */}
                        <div className='mx-2 my-4 overflow-y-scroll max-[500px]'>
                            <form className="w-full" onSubmit={handleSubmit}>
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative ">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <input type="search" id="default-search" className="block sm:w-full w-[100%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for friends"
                                        onInput={handleChangeInput}
                                        value={search}
                                    />
                                    <div className=' w-[85%] sm:w-[35%] flex flex-col mt-2 fixed z-50'>
                                        {
                                            users?.map(user => (
                                                <Link
                                                    key={user._id}
                                                    to={`/message/${user._id}`}
                                                    className=''
                                                    onClick={() => handleSubmit(user)}
                                                >
                                                    <UserCard user={user} />
                                                </Link>
                                            ))
                                        }
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal