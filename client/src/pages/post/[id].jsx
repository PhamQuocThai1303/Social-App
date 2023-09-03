import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useGetSinglePostQuery } from "../../redux/actions/postAction";
import PostCard from "../../components/PostCard";
import Loading from "../../components/alert/Loading";

const Post = () => {
    const { postId } = useParams()
    // const { data } = useGetSinglePostQuery({ id: postId })
    const { posts } = useSelector((state) => state.homePost)
    const [post, setPost] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        if (posts) {
            let newPost = posts?.filter((post) => post?._id == postId)
            setPost(newPost)
        }
    }, [postId, posts])

    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 mb-10">
                {
                    post.length === 0 &&
                    <Loading />
                }

                {
                    post.map(item => (
                        <PostCard key={item._id} post={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Post