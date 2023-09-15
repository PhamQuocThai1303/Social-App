import { apiSlice } from "../api/apiSlice"
import { setError, setSuccess, getNotify, createNotify, deleteNotify } from "../reducers/notifyReducer"


export const notifyApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        createNotify: builder.mutation({
            query: args => ({
                url: '/notify',
                method: 'POST',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { notify } = data
                    // dispatch(createNotify({ notify }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        deleteNotify: builder.mutation({
            query: args => ({
                url: `/notify`,
                method: 'DELETE',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { notify } = data
                    dispatch(deleteNotify({ notify }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        getNotify: builder.query({
            query: args => ({
                url: `/notify/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { notifies } = data
                    dispatch(getNotify({ notifies }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    })
})

export const {
    useCreateNotifyMutation,
    useDeleteNotifyMutation,
    useLazyGetNotifyQuery,
} = notifyApiSlice 