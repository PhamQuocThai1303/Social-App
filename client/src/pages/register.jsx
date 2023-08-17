import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../redux/actions/authAction'
import { setLoading, setError, setSuccess } from '../redux/reducers/notifyReducer'

import { toast } from 'react-toastify';
import Loading from '../components/alert/Loading'

const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male"
}

const Register = () => {
    const { user, token } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()

    const [userData, setUserData] = useState(initialState)
    const { fullname, username, email, password, cf_password, gender } = userData

    const [typePass, setTypePass] = useState(false)


    useEffect(() => {
        if (token) navigate("/")
    }, [token])


    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleChangeGender = (e) => {
        const { value } = e.target
        setUserData({ ...userData, gender: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register({ fullname, username, email, password, cf_password, gender }).unwrap()
            dispatch(setSuccess("Register Success"))
            toast.success("Register success")
            navigate("/")
        } catch (err) {
            dispatch(setError(err.data.message))
            toast.error(err.data.message)
        }
    }

    return (
        <>
            {isLoading && <Loading />}

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register an account
                    </h2>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
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
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChangeInput}
                                    value={fullname}
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChangeInput}
                                    value={username.toLocaleLowerCase().replace(/ /g, '')}
                                />
                            </div>
                        </div>

                        {/* email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChangeInput}
                                    value={email}
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={typePass ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChangeInput}
                                    value={password}
                                />
                                <small
                                    onClick={() => setTypePass(!typePass)}
                                    className='cursor-pointer'
                                >
                                    {typePass ? 'Hide' : 'Show'}
                                </small>
                            </div>
                        </div>

                        {/* cf_password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="cf_password"
                                    name="cf_password"
                                    type={typePass ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChangeInput}
                                    value={cf_password}
                                />
                                <small
                                    onClick={() => setTypePass(!typePass)}
                                    className='cursor-pointer'
                                >
                                    {typePass ? 'Hide' : 'Show'}
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


                        {/* Submit */}
                        <div>
                            <button
                                disabled={false}
                                type="submit"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/" href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register