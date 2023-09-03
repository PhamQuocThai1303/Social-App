import { apiSlice } from "../api/apiSlice"
import { setError, setSuccess } from "../reducers/notifyReducer"
import { createPost, getPost, updatePost, likePost, unlikePost } from "../reducers/postReducer"
import { getUserPosts } from "../reducers/userReducer"

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

        updatePost: builder.mutation({
            query: args => ({
                url: '/post',
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { newPost } = data
                    dispatch(updatePost({ newPost }))
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        likePost: builder.mutation({
            query: args => ({
                url: '/post/like',
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { post, user } = arg
                    dispatch(likePost({ post, user }))
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        unlikePost: builder.mutation({
            query: args => ({
                url: '/post/unlike',
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { post, user } = arg
                    dispatch(unlikePost({ post, user }))
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        getUserPost: builder.query({
            query: args => ({
                url: `/post/${args.id}/userPost`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { posts, postsLength } = data
                    dispatch(getUserPosts({ posts, postsLength }))
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        // getSinglePost: builder.query({
        //     query: args => ({
        //         url: `/post/singlePost/${args.id}`,
        //         method: 'GET',
        //     }),
        //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled
        //             const { post } = data
        //         } catch (err) {
        //             dispatch(console.log(err))
        //         }
        //     }
        // }),
    })
})

export const {
    useCreatPostMutation,
    useGetPostQuery,
    useUpdatePostMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useGetUserPostQuery,
    useGetSinglePostQuery,
} = postApiSlice 