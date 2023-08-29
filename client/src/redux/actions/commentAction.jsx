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
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        likeComment: builder.mutation({
            query: args => ({
                url: '/comment/like',
                method: 'POST',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        unlikeComment: builder.mutation({
            query: args => ({
                url: '/comment/unlike',
                method: 'POST',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        deleteComment: builder.mutation({
            query: args => ({
                url: '/comment/delete',
                method: 'DELETE',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),
    })
})

export const {
    useCreateCommentMutation,
    useLikeCommentMutation,
    useUnlikeCommentMutation,
    useDeleteCommentMutation

} = commentApiSlice 