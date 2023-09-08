import { apiSlice } from "../api/apiSlice"
import { getUser } from "../reducers/userReducer"
import { setError } from "../reducers/notifyReducer"
import { followUser, unFollowUser } from "../reducers/userReducer"
import { followingUser, unFollowingUser } from "../reducers/authReducer"
import { getSuggestUser } from "../reducers/suggestionReducer"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        searchUser: builder.mutation({
            query: credentials => ({
                url: '/search',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        getUser: builder.query({
            query: (args) => ({
                url: `/profile/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { foundUser } = data
                    dispatch(getUser({ foundUser }))

                } catch (err) {
                    dispatch(setError(err.error.message))

                }
            }
        }),
        updateUser: builder.mutation({
            query: args => ({
                url: `/profile/${args.id}`,
                method: 'POST',
                body: { ...args }
            }),

        }),
        follow: builder.mutation({
            query: args => ({
                url: `/profile/${args.id}/follow`,
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { id, user, authUser } = arg
                    dispatch(followUser({ user, authUser })) //update followers cua profile (khac authUser)
                    dispatch(followingUser({ user, authUser }))// update following cua authUser
                } catch (err) {
                    dispatch(setError(err.error.message))

                }
            }
        }),
        unfollow: builder.mutation({
            query: args => ({
                url: `/profile/${args.id}/unfollow`,
                method: 'PATCH',
                body: { ...args }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { id, user, authUser } = arg
                    dispatch(unFollowUser({ user, authUser }))
                    dispatch(unFollowingUser({ user, authUser }))
                } catch (err) {
                    dispatch(setError(err.error.message))

                }
            }
        }),
        suggestUser: builder.query({
            query: args => ({
                url: `/suggestUser/${args.id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { users, length } = data
                    dispatch(getSuggestUser({ users, usersLn: length }))
                } catch (err) {
                    console.log(err);

                }
            }
        }),
    }),

})

export const {
    useSearchUserMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useFollowMutation,
    useUnfollowMutation,
    useSuggestUserQuery,
} = userApiSlice 