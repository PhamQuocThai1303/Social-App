import { useSelector } from "react-redux"
import PostCard from "../PostCard"

const Posts = () => {
    const { posts } = useSelector((state) => state.homePost)

    return (
        <div className="flex w-full sm:grid sm:grid-cols-12 flex-col items-center justify-center">
            <div className="sm:col-start-2 sm:col-span-10 w-full">
                {
                    posts.map((post, index) => (

                        <PostCard key={post._id} post={post} />

                    ))
                }
            </div>
        </div>
    )
}

export default Posts