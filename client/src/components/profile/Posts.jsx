import { useSelector } from "react-redux"

import CardBody from "../home/postCard/CardBody"
import CardHeader from "../home/postCard/CardHeader"
import CardFooter from "../home/postCard/CardFooter"

const Posts = () => {
    const { posts } = useSelector((state) => state.homePost)
    return (
        <div>
            {
                posts.map((post, index) => (
                    <div key={index} className="w-full h-[300px] border-2 my-5">
                        <CardHeader user={post.user} date={post.createdAt} />
                        <CardBody />
                        <CardFooter />
                    </div>
                ))
            }
        </div>
    )
}
export default Posts