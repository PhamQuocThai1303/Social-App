import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Icons = ({ content, setContent }) => {
    const reactions = [
        '❤️', '😺', '🙀', '😿', '😾', '👍', '👎', '😹',
        '😼', '😻', '😽', '🤡', '💀', '👀', '🐧', '🔥',
        '💔', '💚', '❓', '💯', '🇻🇳', '😬', '👏', '🖕'
    ]

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span className='p-0'>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                        </svg>
                    </span>

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
                <Menu.Items className="absolute sm:left-0 right-0 bottom-0 z-10 mb-12 w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className=" flex flex-wrap">
                        {
                            reactions.map((item, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <div
                                            className="cursor-pointer hover:bg-gray-100 p-1"
                                            onClick={() => setContent(content + item)}
                                        >
                                            {item}
                                        </div>
                                    )}
                                </Menu.Item>
                            ))
                        }

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Icons