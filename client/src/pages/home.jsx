import Status from "../components/home/Status"
import PostCard from "../components/PostCard"
import Posts from "../components/home/Posts"
import { useSelector } from "react-redux"
import Loading from "../components/alert/Loading"

const Home = () => {

    const { posts, postsLength } = useSelector((state) => state.homePost)
    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 ">
                <Status />
                {
                    posts && postsLength
                        ? <Posts />
                        : <h1>No Post</h1>
                }
            </div>
        </div>
    )
}
export default Home