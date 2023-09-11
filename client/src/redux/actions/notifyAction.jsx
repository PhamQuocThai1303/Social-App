import { apiSlice } from "../api/apiSlice"
import { setError, setSuccess } from "../reducers/notifyReducer"

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
} = notifyApiSlice 