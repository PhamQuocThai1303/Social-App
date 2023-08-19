import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const foundUser = action.payload.foundUser
            state.user = { ...foundUser }
            // console.log(state.user);
        },
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
        followingUser: (state, action) => {
            const { user, authUser } = action.payload

            const newUser = { ...authUser, following: [...authUser.following, user] }
            return {
                ...state,
                user: newUser
            }
        },
        unFollowingUser: (state, action) => {
            const { user, authUser } = action.payload
            const newUser = { ...authUser, following: authUser.following.filter(item => item._id !== user._id) }
            return {
                ...state,
                user: newUser
            }
        }
    }
})

export const { setCredentials, logOut, setLogin, followingUser, unFollowingUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token