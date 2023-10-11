import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    online: []
}

const onlineSlice = createSlice({
    name: "online",
    initialState,
    reducers: {
        setOnline: (state, action) => {
            const { onlineUser } = action.payload //id of user
            return {
                ...state,
                online: [...state.online, onlineUser]
            }
        },
        setOffline: (state, action) => {
            const { offlineUser } = action.payload //id of user
            return {
                ...state,
                online: state.online.filter(item => item !== offlineUser)
            }
        }
    }
})

export const { setOnline, setOffline } = onlineSlice.actions

export default onlineSlice.reducer
