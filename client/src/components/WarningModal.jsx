import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useDeletePostMutation } from "../redux/actions/postAction"
import { useDeleteNotifyMutation } from "../redux/actions/notifyAction";

const WarningModal = ({ postId, userId, setIsWarning }) => {
    const { user } = useSelector((state) => state.auth)
    const [deletePost] = useDeletePostMutation()
    const [deleteNotify] = useDeleteNotifyMutation()

    const handleDeletePost = async (e) => {
        e.preventDefault()
        try {
            const { message } = await deletePost({ postId, userId }).unwrap()
            setIsWarning(false)

            // Notify
            const notify = {
                postId: postId,
                text: 'added a new post.',
                recipients: user.followers,
                url: `/post/${postId}`,
            }

            await deleteNotify({ notify }).unwrap()
            // return redirect("/"); //return homepage
        } catch (err) {
            toast.error(err.data.message)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div id="default-modal" data-modal-show="true" aria-hidden="true" className="bg-gray-200/50 overflow-x-hidden overflow-y-auto fixed w-full h-full sm:h-full top-0 left-0 right-0 sm:inset-0 z-50 sm:flex sm:justify-center sm:items-center">
                <div className="relative flex justify-center top-16 sm:top-0 w-full max-w-xl px-4">

                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow relative w-full dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <div>
                                <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                    Warning
                                </h3>
                                <h5>Do you want to delete this post?</h5>
                            </div>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal" onClick={() => setIsWarning(false)}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        <div className='mx-2 my-4 flex justify-center gap-20'>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => handleDeletePost(e)}>YES</button>
                            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => setIsWarning(false)}>NO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarningModal