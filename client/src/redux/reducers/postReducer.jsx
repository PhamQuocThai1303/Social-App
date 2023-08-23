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
    }
})

export const { createPost, getPost } = postSlice.actions

export default postSlice.reducer
