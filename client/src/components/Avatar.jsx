import React from 'react'

const Avatar = ({ avatar }) => {
    return (
        <img
            className="h-10 w-10 rounded-full border-2"
            src={`${avatar}`}
            alt=""
        />
    )
}

export default Avatar