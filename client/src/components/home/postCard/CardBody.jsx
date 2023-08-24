'use client';
import React, { useState } from 'react';
import { Carousel } from 'flowbite-react';


const CardBody = ({ images, content }) => {
    const [readMore, setReadMore] = useState(false)

    return (
        <div className='sm:w-[100%] w-screen'>
            <div className={`p-2 break-words w-full flex ${readMore ? 'flex-col' : 'flex-row'}`}>
                <span className={`inline-block ${readMore ? 'text-clip' : 'w-[50%] truncate'}`}>{
                    content
                }</span>
                {
                    content.length > 40 &&
                    <span onClick={() => setReadMore(!readMore)} className='cursor-pointer text-[#646cff] font-semibold'>
                        {readMore ? ' Hide' : ' More'}
                    </span>
                }
            </div>
            {images.length > 0 &&
                <Carousel
                    slide={false}
                    indicators={images.length > 1 && true}
                    leftControl={images.length > 1 ? false : true}
                    rightControl={images.length > 1 ? false : true}
                    className='h-[600px] sm:h-[700px] border-y-2 rounded-none'
                >
                    {
                        images.map((image, index) => (

                            <img
                                className='object-cover object-center flex h-full items-center justify-center bg-white'
                                key={image.public_id}
                                alt="..."
                                src={image.url}
                            />

                        ))
                    }
                </Carousel>
            }
        </div>
    )
}
export default CardBody