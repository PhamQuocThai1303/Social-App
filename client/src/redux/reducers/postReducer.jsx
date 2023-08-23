import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: []
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
    }
})

export const { createPost } = postSlice.actions

export default postSlice.reducer
