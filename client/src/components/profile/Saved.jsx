import PostCard from "../PostCard"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useGetSavePostQuery } from "../../redux/actions/postAction"
import Loading from "../alert/Loading"

const Saved = ({ id, auth }) => {
    const [posts, setPosts] = useState([])
    const { savePosts } = useSelector((state) => state.user)
    const { data, refetch, isLoading } = useGetSavePostQuery({ id: id })

    useEffect(() => {
        setPosts(savePosts)
    }, [id, posts, savePosts, auth])

    if (isLoading) return <Loading />
    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 ">
                <div className="flex w-full sm:grid sm:grid-cols-12 flex-col items-center justify-center">
                    <div className="sm:col-start-2 sm:col-span-10 w-full">
                        {savePosts.length == 0 || savePosts[0] === undefined
                            ? <h1>No Save Post</h1>
                            : <>
                                {
                                    savePosts?.map((post, index) => (
                                        <PostCard key={post._id} post={post} />
                                    ))
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Saved