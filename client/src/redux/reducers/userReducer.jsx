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
            state.users = [...state.users, foundUsers]
            // console.log(state.user);
        },
    }
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
