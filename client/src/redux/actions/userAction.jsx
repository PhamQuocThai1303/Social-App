import { apiSlice } from "../api/apiSlice"
import { getUser } from "../reducers/userReducer"
import { setError } from "../reducers/notifyReducer"

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
    })
})

export const {
    useSearchUserMutation,
    useGetUserQuery,
} = userApiSlice 