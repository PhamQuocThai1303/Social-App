import Avatar from "../Avatar"
import { useSelector, useDispatch } from "react-redux"
import { setStatus } from "../../redux/reducers/statusReducer"

const Status = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    return (
        <div className="w-full sm:p-4 p-2 shadow-md border-2 flex items-center rounded-md">
            <Avatar avatar={user.avatar} />
            <button className="w-full text-left ml-2" onClick={() => dispatch(setStatus(true))}>
                What are you thinking? {user.fullname}
            </button>
        </div>
    )
}

export default Status