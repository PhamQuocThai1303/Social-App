import React from 'react'

const Avatar = ({ avatar }) => {
    return (
        <img
            className="h-8 w-8 rounded-full"
            src={`${avatar}`}
            alt=""
        />
    )
}

export default Avatar