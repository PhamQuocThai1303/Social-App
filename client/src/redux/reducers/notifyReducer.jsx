import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true,
    error: null
}

const notifySlice = createSlice({
    name: "notify",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            const isLoading = action.payload.loading
            state.loading = isLoading
        },
        setError: (state, action) => {
            const err = action.payload
            state.error = err
        }
    }
})

export const { setLoading, setError } = notifySlice.actions

export default notifySlice.reducer
