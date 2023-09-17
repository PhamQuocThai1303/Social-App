import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query"; // được sử dụng để xử lý các side effect và tác động bên ngoài khi các action được gọi
import authReducer from "./reducers/authReducer";
import notifyReducer from "./reducers/notifyReducer";
import userReducer from "./reducers/userReducer";
import statusReducer from "./reducers/statusReducer";
import postReducer from "./reducers/postReducer";
import discoverReducer from "./reducers/discoverReducer";
import singlePostReducer from "./reducers/singlePostReducer";
import suggestionReducer from "./reducers/suggestionReducer";
import socketReducer from "./reducers/socketReducer";
import messageReducer from "./reducers/messageReducer";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        notify: notifyReducer,
        user: userReducer,
        status: statusReducer,
        homePost: postReducer,
        discover: discoverReducer,
        singlePost: singlePostReducer,
        suggestion: suggestionReducer,
        socket: socketReducer,
        message: messageReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false, //fix bug "A non-serializable value was detected in an action" when use socketReducer
    }).concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)