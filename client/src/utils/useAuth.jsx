import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'

const useAuth = () => {
    const { token } = useSelector((state) => state.auth)
    let isAdmin = false
    let status = "user"


    if (token) {
        const decoded = jwtDecode(token)
        const { username, role } = decoded.UserInfo

        isAdmin = role == "admin" ? true : false

        if (isAdmin) status = "admin"

        return { username, role, status, isAdmin }
    }

    return { username: '', role: "", isAdmin, status }
}
export default useAuth