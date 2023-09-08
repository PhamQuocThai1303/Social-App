import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './alert/Loading';
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

const PostThumb = ({ posts }) => {

    const [showPost, setShowPost] = useState([])
    const [next, setNext] = useState(4)

    useEffect(() => {
        if (posts) {
            setShowPost(posts.slice(0, ((posts.length - next) > 0 ? posts.length - next : 4)))
        }
    }, [posts, next])

    return (
        <div className='pb-5'>
            {!posts && showPost.length <= 0
                ? <Loading />
                : <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {
                        showPost?.map((post, index) => (
                            <Link key={index} href="#" to={`/post/${post._id}`}>
                                <div className='h-[300px] sm:h-[350px] border-2 rounded-lg col-span-1'>
                                    <div
                                        className="overflow-hidden  w-full h-full bg-red-400 cursor-pointer relative group rounded-lg"
                                    >
                                        <div
                                            className=" z-50 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out cursor-pointer absolute from-black/100 to-transparent bg-gradient-to-t inset-x-0 -bottom-0 pt-20 text-white flex items-center justify-center"
                                        >
                                            <div>
                                                <div
                                                    className=" p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out"
                                                >
                                                    <div className="flex text-2xl items-center justify-center gap-2">
                                                        <AiOutlineHeart /> {post.likes.length}
                                                        <AiOutlineComment /> {post.comments.length}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            className="object-cover object-center flex w-full h-full items-center justify-center bg-white none "
                                            src={post?.images[0]?.url}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            }
            {
                <div className='flex justify-center items-center my-16'>
                    {posts.length != showPost.length
                        ? <button className='ring-2'
                            onClick={() => setNext(next - 4)}>
                            See more Post
                        </button>

                        : posts.length > 4 &&
                        <button className='ring-2'
                            onClick={() => setNext(4)}>
                            Hide Post
                        </button>
                    }
                </div>
            }
        </div>
    )
}

export default PostThumb