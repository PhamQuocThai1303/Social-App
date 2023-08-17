import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const initialState = {
    fullname: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    gender: ''
}

const EditProfile = ({ user, setIsEdit, userAva }) => {

    const [userData, setUserData] = useState(initialState)
    const { fullname, mobile, address, website, story, gender } = userData

    const [avatar, setAvatar] = useState('')

    const handleChangeGender = (e) => {
        const { value } = e.target
        setUserData({ ...userData, gender: value })
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]

        // const err = checkImage(file)

        setAvatar(file)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div id="default-modal" data-modal-show="true" aria-hidden="true" className="bg-gray-200/50 overflow-x-hidden overflow-y-auto fixed w-full h-full sm:h-full top-0 left-0 right-0 sm:inset-0 z-50 sm:flex sm:justify-center sm:items-center">
                <div className="relative flex justify-center top-16 sm:top-0 w-full max-w-xl px-4">
                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow relative w-full dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                Edit Profile
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal" onClick={() => setIsEdit(false)}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className='mx-2 my-4'>
                            <form>
                                <div className='flex flex-col items-center justify-center'>
                                    <img src={avatar ? URL.createObjectURL(avatar) : userAva}
                                        alt="avatar"
                                        className='h-20 w-20'
                                    />

                                    <div className="flex w-full items-center justify-center bg-grey-lighter">
                                        <label className="w-full max-w-fit px-4 mt-4 flex justify-center items-center bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                            </svg>
                                            <span className="pl-2 text-base leading-normal ">Select a file</span>
                                            <input type='file' className="hidden" onChange={changeAvatar} />
                                        </label>
                                    </div>
                                </div>
                                {/* FUllname */}
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Fullname
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangeInput}
                                            value={fullname}
                                        />
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mobile
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangeInput}
                                            value={mobile}
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangeInput}
                                            value={address}
                                        />
                                    </div>
                                </div>

                                {/* Website */}
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Website
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="website"
                                            name="website"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangeInput}
                                            value={website}
                                        />
                                    </div>
                                </div>

                                {/* Story */}
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Story
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="story"
                                            name="story"
                                            cols="30" rows="4"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangeInput}
                                            value={story}
                                        />
                                        <small >
                                            {story.length}/200
                                        </small>
                                    </div>
                                </div>

                                {/* gender */}
                                <div className="relative inline-flex">
                                    <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                                    <select onClick={handleChangeGender} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                        <option name="gender" value="male">Male</option>
                                        <option name="gender" value="female">Female</option>
                                    </select>
                                </div>
                                {/* footer */}
                                <button data-modal-toggle="default-modal" className="ml-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
                                    SAVE
                                </button>
                                <button data-modal-toggle="default-modal" type="button" className="ml-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600" onClick={() => setIsEdit(false)}>
                                    CANCEL
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile