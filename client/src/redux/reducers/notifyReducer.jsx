import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: null,
    error: null,
    success: null,
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
        },
        setSuccess: (state, action) => {
            const success = action.payload
            state.success = success
        }
    }
})

export const { setLoading, setError, setSuccess } = notifySlice.actions

export default notifySlice.reducer
