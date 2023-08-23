import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query"; // được sử dụng để xử lý các side effect và tác động bên ngoài khi các action được gọi
import authReducer from "./reducers/authReducer";
import notifyReducer from "./reducers/notifyReducer";
import userReducer from "./reducers/userReducer";
import statusReducer from "./reducers/statusReducer";
import postReducer from "./reducers/postReducer";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        notify: notifyReducer,
        user: userReducer,
        status: statusReducer,
        homePost: postReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)