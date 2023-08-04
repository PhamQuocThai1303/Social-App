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
            localStorage.setItem("firstLogin", true)
            console.log(state.user);
        },
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut, setLogin } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token