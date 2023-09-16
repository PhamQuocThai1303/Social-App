import { apiSlice } from "../api/apiSlice"
import { setError, setSuccess, getNotify, createNotify, deleteNotify, isReadNotify, readAllNotify, deleteAllNotify } from "../reducers/notifyReducer"


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
        isReadNotify: builder.mutation({
            query: args => ({
                url: `/isReadNotify/${args.id}`,
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { notify } = data
                    dispatch(isReadNotify({ notify }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        readAllNotify: builder.mutation({
            query: args => ({
                url: `/readAllNotify`,
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { notifies } = data
                    dispatch(readAllNotify())
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        deleteAllNotify: builder.mutation({
            query: args => ({
                url: `/deleteAllNotify`,
                method: 'DELETE',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { notifies } = data
                    dispatch(deleteAllNotify())
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
    useIsReadNotifyMutation,
    useReadAllNotifyMutation,
    useDeleteAllNotifyMutation

} = notifyApiSlice 