import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLazyGetAllUserQuery } from "../redux/actions/userAction";
import Loading from "../components/alert/Loading"
import { AiOutlineReload } from "react-icons/ai";
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import EditProfile from '../components/profile/EditProfile';


const AdminPage = () => {
    const { user, token } = useSelector((state) => state.auth)

    const [allUser, setAllUser] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [userEdit, setUserEdit] = useState({})

    const [getAllUser, result, lastPromiseInfo] = useLazyGetAllUserQuery()

    useEffect(() => {
        if (token) {
            getAllUser()
            if (result?.data) {
                setAllUser(result.data.users)
            }
        }

    }, [token, result.isSuccess])

    const handleRefresh = (e) => {
        e.preventDefault()
        if (token) {
            getAllUser()
            if (result?.data) {
                setAllUser(result.data.users)
            }
        }
    }

    const handleEditUser = (e, user) => {
        e.preventDefault()
        setIsEdit(true)
        setUserEdit(user)
    }

    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 ">
                <div className='flex justify-between gap-3 mb-3'>
                    <div className=' sm:w-full w-[40%]'>
                        <SearchBarAdmin setAllUser={setAllUser} />
                    </div>
                    <button className="p-1">
                        <AiOutlineReload className="text-2xl cursor-pointer" onClick={(e) => handleRefresh(e)} />
                    </button>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:w-full w-screen">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Full name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                !allUser
                                    ? <Loading />
                                    : allUser.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.username}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.fullname}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.role}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={(e) => handleEditUser(e, item)}>Edit</a>
                                            </td>
                                        </tr>
                                    ))
                            }

                        </tbody>
                    </table>
                </div>


            </div>

            {
                isEdit && <EditProfile user={userEdit} setIsEdit={setIsEdit} userAva={userEdit?.avatar} />
            }
        </div>
    )
}

export default AdminPage