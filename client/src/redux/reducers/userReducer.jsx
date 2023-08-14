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
    }
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
