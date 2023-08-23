import { apiSlice } from "../api/apiSlice"
import { setError, setSuccess } from "../reducers/notifyReducer"
import { createPost, getPost } from "../reducers/postReducer"

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        creatPost: builder.mutation({
            query: args => ({
                url: '/post',
                method: 'POST',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { newPost } = data
                    dispatch(createPost({ newPost }))
                    // console.log(newPost);
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        getPost: builder.query({
            query: args => ({
                url: `/post/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { posts, postsLength } = data
                    dispatch(getPost({ posts, postsLength }))
                    // console.log(posts);
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),
    })
})

export const {
    useCreatPostMutation,
    useGetPostQuery,
} = postApiSlice 