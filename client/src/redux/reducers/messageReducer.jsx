import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    data: []
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { user } = action.payload
            if (state.users.every(item => item._id !== user._id)) {
                return {
                    ...state,
                    users: [user, ...state.users]
                };
            }
            return state;
        },
    }
})

export const { addUser } = messageSlice.actions

export default messageSlice.reducer
