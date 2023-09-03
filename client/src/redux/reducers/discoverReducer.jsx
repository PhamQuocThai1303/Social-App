import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    postsLength: 0
}

const discoverSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getDiscoverPost: (state, action) => {
            const { posts, postsLength } = action.payload
            return {
                ...state,
                posts: [...posts],
                postsLength: postsLength
            };
        },

    }
})

export const { getDiscoverPost } = discoverSlice.actions

export default discoverSlice.reducer
