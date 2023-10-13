import { useLocation, Navigate, Outlet } from "react-router-dom"

const RequireAuth = ({ allowedRoles, role }) => {
    const location = useLocation()
    const firstLogin = localStorage.getItem('firstLogin')

    const content = (
        allowedRoles.includes(role)
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )

    return content
}

export default RequireAuth