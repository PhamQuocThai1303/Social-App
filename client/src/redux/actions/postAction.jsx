import { apiSlice } from "../api/apiSlice"
import { setError, setSuccess } from "../reducers/notifyReducer"
import { saveUserPost, unsaveUserPost } from "../reducers/authReducer"
import { createPost, getPost, updatePost, likePost, unlikePost, deletePost } from "../reducers/postReducer"
import { getUserPosts, updateUserPost, likeUserPost, unlikeUserPost, deleteUserPost, savePost, unsavePost, getSavePosts } from "../reducers/userReducer"
import { getDiscoverPost } from "../reducers/discoverReducer"
import { getSinglePost, likeSinglePost, unlikeSinglePost, deleteSinglePost } from "../reducers/singlePostReducer"

import { toast } from 'react-toastify';

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
                    dispatch(likeUserPost({ post, user }))
                    dispatch(likeSinglePost({ post, user }))
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
                    dispatch(unlikeUserPost({ post, user }))
                    dispatch(unlikeSinglePost({ post, user }))
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

        getSinglePost: builder.query({
            query: args => ({
                url: `/post/singlePost/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { post } = data
                    dispatch(getSinglePost({ posts: [post], postsLength: 1 }))

                } catch (err) {
                    console.log(err);
                }
            }
        }),

        getDiscoverPost: builder.query({
            query: args => ({
                url: `/discover/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { posts, postsLength } = data
                    dispatch(getDiscoverPost({ posts, postsLength }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        deletePost: builder.mutation({
            query: args => ({
                url: '/deletePost',
                method: 'DELETE',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { postId } = arg
                    dispatch(deletePost({ postId }))
                    dispatch(deleteUserPost({ postId }))
                    dispatch(deleteSinglePost({ postId }))
                } catch (err) {
                    toast.error(err.data.message)
                }
            }
        }),

        savePost: builder.mutation({
            query: args => ({
                url: '/savePost',
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { post, user } = arg
                    const { data } = await queryFulfilled
                    dispatch(savePost({ post, user }))
                    dispatch(saveUserPost({ post, user }))
                } catch (err) {
                    dispatch(setError(err.error.message))
                }
            }
        }),

        unsavePost: builder.mutation({
            query: args => ({
                url: '/unsavePost',
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { post, user } = arg
                    const { data } = await queryFulfilled
                    dispatch(unsavePost({ post, user }))
                    dispatch(unsaveUserPost({ post, user }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        getSavePost: builder.query({
            query: args => ({
                url: `/getSavePost/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { savePostsLength, savePosts } = data
                    dispatch(getSavePosts({ savePosts, savePostsLength }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
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
    useGetDiscoverPostQuery,
    useDeletePostMutation,
    useSavePostMutation,
    useUnsavePostMutation,
    useGetSavePostQuery
} = postApiSlice 