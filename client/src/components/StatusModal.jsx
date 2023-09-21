import { useSelector, useDispatch } from "react-redux"
import { setStatus } from "../redux/reducers/statusReducer"
import { TfiCamera, TfiGallery, TfiClose } from "react-icons/tfi";
import { checkImage, imageUpload } from "../utils/uploadImage";
import { useState, useRef, useEffect } from "react";
import Loading from './alert/Loading'
import Icons from "./Icons";

import { toast } from 'react-toastify';

import { useCreateNotifyMutation } from "../redux/actions/notifyAction";
import { useCreatPostMutation } from "../redux/actions/postAction";
import { useUpdatePostMutation } from "../redux/actions/postAction";


const StatusModal = ({ post, setIsEdit }) => {
    const { user } = useSelector((state) => state.auth)
    const { socket } = useSelector((state) => state.socket)

    const [images, setImages] = useState([])
    const [content, setContent] = useState('')
    const [stream, setStream] = useState(false)
    const [tracks, setTracks] = useState('')
    const [imgLoading, setImgLoading] = useState(false)

    const videoRef = useRef()
    const refCanvas = useRef()
    const dispatch = useDispatch()
    const [creatPost, { isLoading: loadingCreate }] = useCreatPostMutation()
    const [updatePost, { isLoading: loadingUpdate }] = useUpdatePostMutation()
    const [createNotify] = useCreateNotifyMutation()

    const deleteImg = (index, e) => {
        e.preventDefault()
        const newImages = [...images]

        newImages.splice(index, 1)
        setImages(newImages)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }


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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let media;

            if (images.length > 0) {
                media = await imageUpload(images)
            }
            const { message, newPost } = await creatPost({ userId: user?._id, content, images: media }).unwrap()
            dispatch(setStatus(false))
            setContent('')
            setImages([])
            if (tracks) tracks.stop

            // Notify 
            const notify = {
                userId: user._id,
                postId: newPost._id,
                text: 'added a new post.',
                recipients: newPost.user.followers,
                url: `/post/${newPost._id}`,
                content,
            }
            const { notify: res } = await createNotify({ notify }).unwrap()

            //socket
            socket.emit('createNotify', {
                ...res,
                user: {
                    username: user.username,
                    avatar: user.avatar
                }
            })

            // window.location.reload() //reload web de solve loi avatar chua dc load
            toast.success(message)

        } catch (error) {
            toast.error(error)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            let media;
            let msg; //message of api
            //check img dc them vao va img da co san
            const imgNewUrl = images.filter(img => !img.url)
            const imgOldUrl = images.filter(img => img.url)

            //k thay doi => return
            if (post?.content === content && imgNewUrl?.length === 0 && imgOldUrl?.length === post?.images?.length
            ) dispatch(setStatus(false));


            if (imgNewUrl.length > 0) {
                setImgLoading(true)
                media = await imageUpload(imgNewUrl)
                setImgLoading(false)
            }
            //cap nhat image moi neu co
            if (media) {
                const { message } = await updatePost({ postId: post._id, content, images: [...imgOldUrl, ...media] }).unwrap()
                msg = message
            }
            else {

                const { message } = await updatePost({ postId: post._id, content, images: [...imgOldUrl] }).unwrap()
                msg = message
            }
            setContent('')
            setImages([])
            if (tracks) tracks.stop
            window.location.reload() //reload web
            toast.success(msg)
            dispatch(setIsEdit(false))
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        if (setIsEdit) {
            setContent(post.content)
            setImages(post.images)
        }
    }, [setIsEdit])

    if (loadingCreate || loadingUpdate || imgLoading) return <Loading />

    return (
        <div className="max-w-2xl mx-auto">
            <div id="default-modal" data-modal-show="true" aria-hidden="true" className="bg-gray-200/50 overflow-x-hidden overflow-y-auto fixed w-full h-full sm:h-full top-0 left-0 right-0 sm:inset-0 z-50 sm:flex sm:justify-center sm:items-center">
                <div className="relative flex justify-center top-16 sm:top-0 w-full max-w-xl px-4">

                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow relative w-full dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                {setIsEdit ? 'EditPost' : 'Post'}
                                {/* Post */}
                            </h3>

                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal"
                                onClick={() => { setIsEdit ? setIsEdit(false) : dispatch(setStatus(false)) }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className='mx-2 my-4 max-[500px]'>

                            <form>
                                {/* show image */}
                                <div className="flex overflow-y-scroll w-full max-w[100px] gap-2 items-center">
                                    {
                                        images.map((image, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                {image &&
                                                    <img src={image.camera ? image.camera : image.url ? image.url : URL.createObjectURL(image)}
                                                        alt="avatar"
                                                        className='sm:max-w-[200px] sm:max-h-[200px] max-w-[100px] max-h-[100px] object-contain border-2 '
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
                                {/* Camera */}
                                {
                                    stream &&
                                    <div className="flex flex-col sm:flex-row justify-center items-center">
                                        <video className="w-[400px] rounded" autoPlay muted ref={videoRef} />
                                        <div className="flex sm:flex-col items-center sm:ml-4 mt-4 gap-10">
                                            <TfiClose className="text-2xl" onClick={handleStopStream} />

                                            <canvas className="h-[50px] hidden" ref={refCanvas} />
                                            <TfiCamera className="text-2xl" onClick={handleCapture} />
                                        </div>

                                    </div>
                                }

                                <small className="ml-2">
                                    {content.length}/200
                                </small>

                                {/* content */}
                                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                        <label htmlFor="comment" className="sr-only">Your text</label>
                                        <textarea id="comment" rows="4" className="w-full h-[200px] max-h-[250px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="What are you thinking?" value={content} onChange={(e) => setContent(e.target.value)}>

                                        </textarea>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                            onClick={(e) => {
                                                setIsEdit
                                                    ? handleUpdate(e)
                                                    : handleSubmit(e)
                                            }}>
                                            {setIsEdit ? 'Update' : 'Post'}
                                        </button>
                                        <div className="flex pl-0 space-x-1 sm:pl-2">
                                            <Icons content={content} setContent={setContent} />

                                            <label type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 text-2xl " onClick={handleStream}>
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
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StatusModal