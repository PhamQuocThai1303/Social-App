import Status from "../components/home/Status"
import PostCard from "../components/PostCard"
import { useSelector } from "react-redux"
import Loading from "../components/alert/Loading"

const Home = () => {

    const { posts, postsLength } = useSelector((state) => state.homePost)
    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 ">
                <Status />
                {
                    posts
                        ? postsLength > 0 ? <PostCard /> : <h1>No Post</h1>
                        : <Loading />
                }
            </div>
        </div>
    )
}
export default Home