import { apiSlice } from "../api/apiSlice"
import { addMessage, getConversations, getMessage, deleteMessage } from "../reducers/messageReducer";

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
        createMessage: builder.mutation({
            query: args => ({
                url: '/message',
                method: 'POST',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { newMessage } = data
                    dispatch(addMessage(newMessage))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        getConversations: builder.query({
            query: args => ({
                url: `/conversations/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { conversations } = data

                    let newArr = [];
                    conversations.forEach(item => { //create newArr message with the id of params
                        item.recipients.forEach(cv => {
                            if (cv._id !== arg.id) {
                                newArr.push({ ...cv, text: item.text, images: item.images, call: item.call })
                            }
                        })
                    })
                    dispatch(getConversations(newArr))

                } catch (err) {
                    console.log(err);
                }
            }
        }),
        getMessage: builder.mutation({
            query: args => ({
                url: `/message/${args.id}/${args.authId}`,
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { foundMessage } = data
                    dispatch(getMessage(foundMessage))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        deleteMessage: builder.mutation({
            query: args => ({
                url: `/message/${args.id}/${args.authId}`,
                method: 'PATCH'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(deleteMessage(arg.id))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        restoreMessage: builder.mutation({
            query: args => ({
                url: `/restoreMsg/${args.id}/${args.authId}`,
                method: 'PATCH'
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
    useAddUserMutation,
    useCreateMessageMutation,
    useLazyGetConversationsQuery,
    useGetMessageMutation,
    useDeleteMessageMutation,
    useRestoreMessageMutation
} = messageApiSlice 