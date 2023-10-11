import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LeftSide from '../../components/message/LeftSide'
// import message_image from '../../../public/message_image'
import message_image from '../../assets/message_image.png'

const Message = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        <div className="grid mx-2 grid-cols-12 sm:py-4 ">
            <div className="grid-cols-12 col-start-1 col-span-12 sm:col-start-3 sm:col-span-8 grid sm:grid-cols-12 border-2 h-[calc(100vh_/_1.15)]">
                <div className='col-span-3 sm:col-span-4 border-r-2'>
                    {
                        <LeftSide />
                    }
                </div>
                <div className='col-span-9 sm:col-span-8'>
                    <div className='flex flex-col justify-center items-center w-full h-full'>
                        <img src={message_image}
                            alt="avatar"
                            className='max-w-[100px] max-h-[100px] object-contain  ml-2'
                        />
                        <span className='text-xl font-sans italic font-semibold'>Your message</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message