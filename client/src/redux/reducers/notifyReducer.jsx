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
        },
        isReadNotify: (state, action) => {
            const { notify } = action.payload
            const newNoti = state.data.map((item) => {
                if (item._id === notify._id) {
                    item = { ...notify }
                }
                return item
            })
            return {
                ...state,
                data: [...newNoti]
            };
        },
        readAllNotify: (state, action) => {
            const newNoti = state.data.map((item) => {
                if (item.isRead === false) {
                    const newItem = { ...item }
                    newItem.isRead = true
                    return newItem
                }
                return item
            })

            return {
                ...state,
                data: [...newNoti]
            };
        },
        deleteAllNotify: (state, action) => {
            return {
                ...state,
                data: []
            };
        },
    }
})

export const { setLoading, setError, setSuccess, getNotify, createNotify, deleteNotify, isReadNotify, readAllNotify, deleteAllNotify } = notifySlice.actions

export default notifySlice.reducer
