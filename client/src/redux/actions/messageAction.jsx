import { apiSlice } from "../api/apiSlice"
import { addMessage } from "../reducers/messageReducer";

export const messageApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        addUser: builder.mutation({
            query: args => ({
                url: '',
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
        addMessage: builder.mutation({
            query: args => ({
                url: '',
                method: 'POST',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addMessage({ arg }))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    })
})

export const {
    useAddUserMutation,
    useAddMessageMutation,
} = messageApiSlice 