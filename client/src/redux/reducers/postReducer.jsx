import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    postsLength: 0
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPost: (state, action) => {
            const newPost = action.payload.newPost
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        },
        getPost: (state, action) => {
            const { posts, postsLength } = action.payload
            return {
                ...state,
                posts: posts,
                postsLength: postsLength
            };
        },
        likePost: (state, action) => {
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
        unlikePost: (state, action) => {
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

export const { createPost, getPost, likePost, unlikePost } = postSlice.actions

export default postSlice.reducer
