import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    userLength: 0
}

const suggestionSlice = createSlice({
    name: "suggestion",
    initialState,
    reducers: {
        getSuggestUser: (state, action) => {
            const { users, usersLn } = action.payload
            return {
                ...state,
                users: [...users],
                userLength: usersLn
            };
        },

    }
})

export const { getSuggestUser } = suggestionSlice.actions

export default suggestionSlice.reducer
