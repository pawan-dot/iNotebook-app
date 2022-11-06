// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import {
//     forgotPasswordReducer,
//     profileReducer,
//     userDetailsReducer,
//     userReducer,
// } from "./reducer/user";
// const reducer = combineReducers({
//     user: userReducer,
//     profile: profileReducer,
//     forgotPassword: forgotPasswordReducer,
// });
// let initialState = {};
// const middleware = [thunk];

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { NotesReducer } from "./reducer/Notes";
// import { newProductReducer } from "./reducers/productReducer";
import { AuthReducer } from "./reducer/user";


const store = configureStore({
    reducer: {
        user: AuthReducer,
        Notes: NotesReducer

    },
});

export default store;