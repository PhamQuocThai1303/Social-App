import Status from "../components/home/Status"
import Posts from "../components/home/Posts"
import { useSelector } from "react-redux"
import Loading from "../components/alert/Loading"
import RightSideBar from "../components/home/RightSideBar"
import { useSuggestUserQuery } from "../redux/actions/userAction"

const Home = ({ user }) => {

    const { posts, postsLength } = useSelector((state) => state.homePost)

    const { users, refetch } = useSuggestUserQuery({ id: user?._id })


    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 ">
                <Status />
                {
                    !posts && !postsLength
                        ? <h1>No Post</h1>
                        : <Posts posts={posts} />
                }
            </div>

            <div className="sm:col-start-10 sm:col-span-3 ml-10 ">
                <RightSideBar refetch={refetch} />
            </div>

        </div>
    )
}
export default Home