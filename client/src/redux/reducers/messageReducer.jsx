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

        addMessage: (state, action) => {
            return {
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(user =>
                    user._id === action.payload.recipient || user._id === action.payload.sender
                        ? { ...user, text: action.payload.text, images: action.payload.images }
                        : user
                )
            };
        },

        getConversations: (state, action) => {
            return {
                ...state,
                users: action.payload
            }
        },

        getMessage: (state, action) => {
            return {
                ...state,
                data: [...action.payload]
            }
        }
    }
})

export const { addUser, addMessage, getConversations, getMessage } = messageSlice.actions

export default messageSlice.reducer
