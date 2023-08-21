import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false
}

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            const status = action.payload
            state.status = status
        },

    }
})

export const { setStatus } = statusSlice.actions

export default statusSlice.reducer
