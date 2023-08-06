import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = () => {
    const { loading } = useSelector((state) => state.notify)
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </div>
    )
}

export default Notify