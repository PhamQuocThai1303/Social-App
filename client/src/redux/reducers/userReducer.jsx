import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    posts: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            const foundUsers = action.payload.foundUser
            return {
                ...state,
                users: [...state.users, foundUsers]
            };
        },
        followUser: (state, action) => {
            const { user, authUser } = action.payload

            const newUser = { ...user, followers: [...user.followers, authUser] }
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item._id === newUser._id) item = { ...newUser }
                    return item
                })
            }
        },
        unFollowUser: (state, action) => {
            const { user, authUser } = action.payload
            const newUser = { ...user, followers: user.followers.filter(item => item._id !== authUser._id) }
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item._id === newUser._id) item = { ...newUser }
                    return item
                })
            }
        }
    }
})

export const { getUser, followUser, unFollowUser } = userSlice.actions

export default userSlice.reducer
