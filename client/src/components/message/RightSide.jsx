import React, { useState, useEffect, useRef } from "react"
import UserCard from "../UserCard"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { checkImage, imageUpload } from "../../utils/uploadImage"
import MessageDisplay from "./MessageDisplay"
import { TfiTrash } from "react-icons/tfi";
import { TfiCamera, TfiGallery, TfiClose } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";
import Icons from "../Icons"
import Loading from "../alert/Loading"

import { useCreateMessageMutation, useGetMessageMutation } from "../../redux/actions/messageAction"


const RightSide = () => {
    const { user } = useSelector((state) => state.auth)
    const { users, data } = useSelector((state) => state.message)
    const { socket } = useSelector((state) => state.socket)

    const dispatch = useDispatch()
    const refDisplay = useRef()
    const [createMessage] = useCreateMessageMutation()
    const [getMessage] = useGetMessageMutation()

    const { userId } = useParams()
    const [curUser, setCurUser] = useState([])
    const [text, setText] = useState("")

    const [images, setImages] = useState([])
    const [stream, setStream] = useState(false)
    const [tracks, setTracks] = useState('')
    const [imgLoading, setImgLoading] = useState(false)

    useEffect(() => {
        const newUser = users.find(user => user._id === userId)
        if (newUser) setCurUser(newUser)
    }, [userId, users])

    const handleChangeImages = async (e) => {
        const files = [...e.target.files]

        let newImg = []
        files.forEach((file) => {
            const err = checkImage(file)
            if (err) toast.error(err)

            return newImg.push(file)
        })
        setImages([...images, ...newImg])
    }

    const deleteImg = (index, e) => {
        e.preventDefault()
        const newImages = [...images]

        newImages.splice(index, 1)
        setImages(newImages)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!text.trim() && images.length === 0) return;

        try {
            let media;
            setImgLoading(true)
            if (images.length > 0) {
                media = await imageUpload(images)
            }

            setText('')
            setImages([])
            if (tracks) tracks.stop

            const message = {
                sender: user?._id,
                recipient: curUser?._id,
                text,
                images: media,
                createdAt: new Date().toISOString()
            }
            setImgLoading(false)
            await createMessage({ message }).unwrap()

            socket.emit('addMessage', message)
            // // Notify 
            // const notify = {
            //     userId: user._id,
            //     postId: newPost._id,
            //     text: 'added a new post.',
            //     recipients: newPost.user.followers,
            //     url: `/post/${newPost._id}`,
            //     content,
            // }
            // const { notify: res } = await createNotify({ notify }).unwrap()

            // //socket
            // socket.emit('createNotify', {
            //     ...res,
            //     user: {
            //         username: user.username,
            //         avatar: user.avatar
            //     }
            // })

            if (refDisplay.current) {
                refDisplay.current.scrollTo(0, refDisplay.current.scrollHeight)
            }

        } catch (error) {
            console.log(error);
        }
    }

    //get message
    useEffect(() => {
        const getMessagesData = async () => {
            if (data.every(item => item._id !== userId) && user._id) {
                await getMessage({ authId: user?._id, id: userId }).unwrap()
                if (refDisplay.current) {
                    refDisplay.current.scrollTo(0, refDisplay.current.scrollHeight)
                }
            }
        }
        getMessagesData()
    }, [userId, user])



    return (
        <div className=" h-full flex flex-col justify-between max-h-[640px] ">
            {curUser != 0 &&
                <div className="flex relative">
                    <Link to={`/profile/${curUser._id}`} className="w-full">
                        <UserCard user={curUser} />
                    </Link>
                    <TfiTrash className="absolute w-6 h-6 right-0 mt-4 mr-10 cursor-pointer" />
                </div>
            }

            {/* message */}
            <div className="grow flex flex-col w-full h-full overflow-x-hidden justify-end space-y-4 p-3 overflow-y-auto ">
                <div className="overflow-y-scroll max-h-[500px]" ref={refDisplay}
                    style={{ scrollBehavior: "smooth" }}>
                    {
                        imgLoading &&
                        <div className="inline-block bg-white ">
                            <div className="flex justify-center items-center h-full">
                                <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
                            </div>
                        </div>

                    }
                    {
                        data?.map((msg, index) => (
                            <div key={index}>
                                {
                                    msg.sender !== user._id &&
                                    <div className="my-4">
                                        <MessageDisplay user={curUser} isAuth={false} msg={msg} data={data} />
                                    </div>
                                }

                                {
                                    msg.sender === user._id &&
                                    <div className="my-2">
                                        <MessageDisplay user={user} isAuth={true} msg={msg} data={data} />
                                    </div>
                                }
                            </div>
                        ))

                    }
                </div>
            </div>

            {/* show Image */}
            <div className="flex overflow-y-scroll gap-2 items-center bg-slate-50 pl-3 pt-3">
                {
                    images.map((image, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {image &&
                                <img src={image.camera ? image.camera : image.url ? image.url : URL.createObjectURL(image)}
                                    alt="avatar"
                                    className='sm:max-w-[150px] sm:max-h-[150px] max-w-[100px] max-h-[100px] object-contain border-2 mt-7'
                                />
                            }
                            {image &&
                                <button className="p-1" onClick={(e) => deleteImg(index, e)}>
                                    <TfiClose />
                                </button>
                            }
                        </div>
                    ))
                }
            </div>

            {/* Input */}
            <form className="justify-self-end" onSubmit={handleSubmit}>
                <div className=" flex items-center text-clip p-1 w-full max-h-[120px] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <input id="chat" type='text' className='w-full border-none focus:ring-white' placeholder="Your message..." value={text} onChange={e => setText(e.target.value)} />

                    <div className="flex pl-0 space-x-1 sm:pl-2">
                        <Icons content={text} setContent={setText} />

                        <label type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 text-2xl " >
                            <TfiCamera />
                            <span className="sr-only">Upload camera</span>
                        </label>

                        <label className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 text-2xl">
                            <TfiGallery />
                            <span className="sr-only">Upload image</span>
                            <input type='file' name='file' className="hidden" multiple accept="image/*"
                                onChange={handleChangeImages} />
                        </label>
                    </div>

                    <button type='submit' className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <AiOutlineSend className='text-2xl' />
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RightSide