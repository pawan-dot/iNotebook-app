import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//     loading: true,
// };
const initialState = {};
export const AuthReducer = createReducer(
    initialState,
    {
        //Register User
        REGISTER_USER_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        REGISTER_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
        },
        REGISTER_USER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        //login
        LOGIN_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
            // state.user = action.payload;
        },
        LOGIN_FAILURE: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        // //load User
        // LOAD_USER_REQUEST: (state) => {
        //     state.loading = true;
        // },
        // LOAD_USER_SUCCESS: (state, action) => {
        //     state.loading = false;
        //     state.user = action.payload;
        //     state.isAuthenticated = true;
        // },
        // LOAD_USER_FAILURE: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        //     state.isAuthenticated = false;
        // },
        LOAD_USER_REQUEST: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOAD_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
            // state.user = action.payload;
        },
        LOAD_USER_FAILURE: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        //Logout User
        LOGOUT_REQUEST: (state) => {
            state.loading = true;
        },
        LOGOUT_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload;
        },
        LOGOUT_FAILURE: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        },

        CLEAR_ERRORS: (state) => {
            state.error = null;
        },
        CLEAR_MESSAGE: (state) => {
            state.message = null;
        },
    }
);
// export const registerReducer = createReducer(
//     { initialState },
//     {
//         REGISTER_USER_REQUEST: (state) => {
//             state.loading = true;
//             state.isAuthenticated = false;
//         },
//         REGISTER_USER_SUCCESS: (state, action) => {
//             state.loading = false;
//             state.isAuthenticated = true;
//             state.message = action.payload;
//         },
//         REGISTER_USER_FAIL: (state, action) => {
//             state.loading = false;
//             state.isAuthenticated = false;
//             state.error = action.payload;
//         },



//         CLEAR_ERRORS: (state) => {
//             state.error = null;
//         },
//         CLEAR_MESSAGE: (state) => {
//             state.message = null;
//         },
//     }
// );
