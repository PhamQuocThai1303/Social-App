import { apiSlice } from "../api/apiSlice"

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
        }),
    })
})

export const {
    useSearchUserMutation,
    useGetUserQuery,
} = userApiSlice 