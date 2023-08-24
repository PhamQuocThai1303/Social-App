import { useSelector } from "react-redux"

import CardBody from "../home/postCard/CardBody"
import CardHeader from "../home/postCard/CardHeader"
import CardFooter from "../home/postCard/CardFooter"

const Posts = () => {
    const { posts } = useSelector((state) => state.homePost)
    return (
        <div className="flex w-full sm:grid sm:grid-cols-12 flex-col items-center justify-center">
            <div className="sm:col-start-2 sm:col-span-10 w-full">
                {
                    posts.map((post, index) => (
                        <div key={index} className="w-full h-full border-2 rounded my-5">
                            <CardHeader user={post.user} date={post.createdAt} />
                            <CardBody images={post.images} content={post.content} />
                            <CardFooter />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Posts