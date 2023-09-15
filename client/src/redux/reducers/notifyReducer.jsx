import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
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
        },
        getNotify: (state, action) => {
            const { notifies } = action.payload
            return {
                ...state,
                data: notifies
            };
        },
        createNotify: (state, action) => {
            const { notify } = action.payload
            return {
                ...state,
                data: [notify, ...state.data]
            };
        },
        deleteNotify: (state, action) => {
            const { notify } = action.payload
            return {
                ...state,
                data: state.data.filter(item => (
                    item.id !== notify.id || item.url !== notify.url
                ))
            };
        }
    }
})

export const { setLoading, setError, setSuccess, getNotify, createNotify, deleteNotify } = notifySlice.actions

export default notifySlice.reducer
