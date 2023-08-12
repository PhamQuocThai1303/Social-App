import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchUser: {},
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        searchUser: (state, action) => {
            const foundUsers = action.payload.foundUser
            state.searchUser = { ...foundUsers }
            // console.log(state.user);
        },

    }
})

export const { searchUser } = userSlice.actions

export default userSlice.reducer
