import { Outlet, Navigate } from 'react-router-dom'

const PrivateRouter = ({ children }) => {
    const firstLogin = localStorage.getItem('firstLogin')
    return firstLogin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRouter