import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/actions/authAction'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { TfiAlignJustify, TfiClose, TfiBell } from "react-icons/tfi";
import { logOut } from '../../redux/reducers/authReducer'
import { setSuccess, setError } from '../../redux/reducers/notifyReducer'
import { toast } from 'react-toastify';
import { TfiSearch } from "react-icons/tfi";

import NotifyModal from './NotifyModal'
import Avatar from '../Avatar'
import SearchBar from './SearchBar'

const Header = () => {
    const navigation = [
        { name: 'Home', path: "/" },
        { name: 'Discover', path: "/discover" },
        { name: 'Message', path: "/message" },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const { user, token } = useSelector((state) => state.auth)
    const { data } = useSelector((state) => state.notify)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [logout, { isLoading }] = useLogoutMutation()

    const isCurrent = (pn) => {
        if (pn === pathname) return true
    }

    const handleLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(logOut())
            dispatch(setSuccess("Logout Success"))
            toast.success("Logout success")
            navigate("/")
        } catch (err) {
            dispatch(setError(err.data.message))
            toast.error(err.data.message)
        }
    }

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800 sticky top-0 w-full z-50">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-center grid grid-cols-8">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <TfiClose className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <TfiAlignJustify className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                {/* left header */}
                                <div className="flex flex-1 items-center sm:justify-start sm:items-stretch sm:col-span-3 sm:w-full">
                                    <div className="sm:block hidden flex flex-shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (

                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className={classNames(
                                                        isCurrent(item.path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                                                    )}
                                                    aria-current={isCurrent(item.path) ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>

                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* searchbar in w-screen */}
                                <div className="hidden flex-1 sm:col-span-3 sm:w-full sm:flex sm:justify-center sm:items-stretch" >
                                    <SearchBar />
                                </div>

                                {/* searchbar in s-screen */}
                                <Menu as="div" className='sm:hidden relative flex justify-end col-span-3'>
                                    <div>
                                        <Menu.Button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md  text-sm font-semibold shadow-sm ring-inset" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            <TfiSearch className="-mr-1 h-5 w-5 text-gray-400" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute z-10 top-[135%] w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            {({ active }) => (
                                                <SearchBar />
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* right header */}
                                <div className="absolute sm:justify-end inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 sm:col-span-2">

                                    {/* Notify dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-gray-400 p-1 text-sm hover:text-white focus:outline-none focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                {data.length > 0 &&
                                                    <span className='absolute -right-1 bottom-0 flex justify-center bg-red-600 rounded-full h-4 w-4 items-center'>{data.length}</span>
                                                }
                                                <TfiBell className="h-6 w-6" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0  z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <NotifyModal />

                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none ">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <Avatar
                                                    avatar={user.avatar}
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/profile/${user._id}`}
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            onClick={handleLogout}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        {/* responsive header */}
                        <Disclosure.Panel className="sm:hidden fixed bg-gray-800 w-full">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <div
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={classNames(
                                                isCurrent(item.path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                                            )}
                                            aria-current={isCurrent(item.path) ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure >
        </>
    )
}

export default Header