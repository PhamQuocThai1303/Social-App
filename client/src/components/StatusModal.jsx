import { useSelector, useDispatch } from "react-redux"
import { setStatus } from "../redux/reducers/statusReducer"
import { TfiCamera, TfiGallery, TfiClose } from "react-icons/tfi";
import { checkImage } from "../utils/uploadImage";
import { useState, useRef } from "react";

import { toast } from 'react-toastify';



const StatusModal = () => {
    const [images, setImages] = useState([])
    const [content, setContent] = useState('')
    const [stream, setStream] = useState(false)
    const [tracks, setTracks] = useState('')

    const videoRef = useRef()
    const refCanvas = useRef()
    const dispatch = useDispatch()

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
    return (
        <div className="max-w-2xl mx-auto">
            <div id="default-modal" data-modal-show="true" aria-hidden="true" className="bg-gray-200/50 overflow-x-hidden overflow-y-auto fixed w-full h-full sm:h-full top-0 left-0 right-0 sm:inset-0 z-50 sm:flex sm:justify-center sm:items-center">
                <div className="relative flex justify-center top-16 sm:top-0 w-full max-w-xl px-4">

                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow relative w-full dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                Post
                            </h3>

                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal" onClick={() => dispatch(setStatus(false))}>
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
                                                    <img src={image.camera ? image.camera : URL.createObjectURL(image)}
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
                                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                            Post
                                        </button>
                                        <div className="flex pl-0 space-x-1 sm:pl-2">
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