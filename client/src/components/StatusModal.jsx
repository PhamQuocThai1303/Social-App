import { useSelector, useDispatch } from "react-redux"
import { setStatus } from "../redux/reducers/statusReducer"
import { TfiCamera, TfiGallery } from "react-icons/tfi";

const StatusModal = () => {
    const dispatch = useDispatch()
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
                                <small className="ml-2">
                                    0/200
                                </small>
                                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                        <label htmlFor="comment" className="sr-only">Your text</label>
                                        <textarea id="comment" rows="4" className="w-full h-[200px] max-h-[250px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="What are you thinking?" >

                                        </textarea>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                            Post
                                        </button>
                                        <div className="flex pl-0 space-x-1 sm:pl-2">
                                            <label type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 text-2xl ">
                                                <TfiCamera />
                                                <span className="sr-only">Upload camera</span>
                                            </label>

                                            <label className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 text-2xl">
                                                <TfiGallery />
                                                <span className="sr-only">Upload image</span>
                                                <input type='file' name='file' className="hidden" multiple accept="image/*" />
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