import { apiSlice } from "../api/apiSlice"
import { logOut, setCredentials, setLogin } from "../reducers/authReducer"
import { setError, setSuccess } from "../reducers/notifyReducer"


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            }),
        }),

        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)

                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken, foundUser } = data
                    dispatch(setLogin({ foundUser }))
                    dispatch(setCredentials({ accessToken }))
                    dispatch(setSuccess("refresh success"))
                } catch (err) {
                    dispatch(setError(err.error.message))

                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation,
    useRegisterMutation,
} = authApiSlice 