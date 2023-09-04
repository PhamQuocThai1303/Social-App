import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    postsLength: 0
}

const singlePostSlice = createSlice({
    name: "singlePost",
    initialState,
    reducers: {
        getSinglePost: (state, action) => {
            const { posts, postsLength } = action.payload
            return {
                ...state,
                posts: posts,
                postsLength: postsLength
            };
        },
        updateSinglePost: (state, action) => {
            const newPost = action.payload.newPost
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id === newPost._id) item = { ...newPost }
                    return item
                })
            }
        },

        likeSinglePost: (state, action) => {
            const { post, user } = action.payload
            const newPost = { ...post, likes: [...post.likes, user] }
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id === newPost._id) item = { ...newPost }
                    return item
                })
            }
        },
        unlikeSinglePost: (state, action) => {
            const { post, user } = action.payload
            const newPost = { ...post, likes: post.likes.filter(item => item._id !== user._id) }
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id === newPost._id) item = { ...newPost }
                    return item
                })
            }
        },
    }
})

export const { getSinglePost, updateSinglePost, likeSinglePost, unlikeSinglePost } = singlePostSlice.actions

export default singlePostSlice.reducer
