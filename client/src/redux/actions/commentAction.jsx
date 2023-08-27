import { apiSlice } from "../api/apiSlice"
import { setError, setSuccess } from "../reducers/notifyReducer"

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createComment: builder.mutation({
            query: args => ({
                url: '/comment',
                method: 'POST',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { newComment } = data
                    // console.log(newComment);
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

    })
})

export const {
    useCreateCommentMutation,

} = commentApiSlice 