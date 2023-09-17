import React from "react"
import LeftSide from "../../components/message/LeftSide"
import RightSide from '../../components/message/RightSide'

const Conversation = () => {
    return (
        <div className="grid mx-2 grid-cols-12 sm:py-4 ">
            <div className="grid-cols-12 col-start-1 col-span-12 sm:col-start-3 sm:col-span-8 grid sm:grid-cols-12 border-2 h-[calc(100vh_/_1.15)]">
                <div className='col-span-3 sm:col-span-4 border-r-2'>
                    {
                        <LeftSide />
                    }
                </div>
                <div className='col-span-9 sm:col-span-8 '>
                    {
                        <RightSide />
                    }
                </div>
            </div>
        </div>
    )
}

export default Conversation