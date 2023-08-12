import { apiSlice } from "../api/apiSlice"
import { searchUser } from "../reducers/userReducer"


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        searchUser: builder.mutation({
            query: credentials => ({
                url: '/search',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
    })
})

export const {
    useSearchUserMutation,
} = userApiSlice 