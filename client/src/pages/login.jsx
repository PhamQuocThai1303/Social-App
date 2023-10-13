import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLoginMutation } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, setLogin } from '../redux/reducers/authReducer'
import { setLoading, setError, setSuccess } from '../redux/reducers/notifyReducer'

import { toast } from 'react-toastify';

import Loading from '../components/alert/Loading'

const initialState = {
    email: "",
    password: ""
}

const Login = () => {
    const { user, token } = useSelector((state) => state.auth)

    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [login, { isLoading }] = useLoginMutation()

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken, foundUser } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            dispatch(setLogin({ foundUser }))
            dispatch(setLoading({ loading: isLoading }))
            dispatch(setSuccess("Login Success"))
            // navigate("/")
            toast.success("Login success")
        } catch (err) {
            dispatch(setError(err.data.message))
            toast.error(err.data.message)
        }
    }

    return (
        <>
            {isLoading && <Loading />}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
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

                        <div>
                            <button
                                disabled={email && password ? false : true}
                                type="submit"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        You dont have an account?{' '}
                        <Link to="/register" href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login