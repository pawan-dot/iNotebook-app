import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const NotesReducer = createReducer(initialState, {
    getNotesRequest: (state) => {
        state.loading = true;
    },
    getNotesSuccess: (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        // state.message = action.payload;
    },
    getNotesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    addNotesRequest: (state) => {
        state.loading = true;
    },
    addNotesSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addNotesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateNotesRequest: (state) => {
        state.loading = true;
    },
    updateNotesSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateNotesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    //delete requist
    deleteNotesRequest: (state) => {
        state.loading = true;
    },
    deleteNotesSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteNotesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // newPostRequest: (state) => {
    //     state.loading = true;
    // },
    // newPostSuccess: (state, action) => {
    //     state.loading = false;
    //     state.message = action.payload;
    // },
    // newPostFailure: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },



    // deletePostRequest: (state) => {
    //     state.loading = true;
    // },
    // deletePostSuccess: (state, action) => {
    //     state.loading = false;
    //     state.message = action.payload;
    // },
    // deletePostFailure: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },

    // updateProfileRequest: (state) => {
    //     state.loading = true;
    // },
    // updateProfileSuccess: (state, action) => {
    //     state.loading = false;
    //     state.message = action.payload;
    // },
    // updateProfileFailure: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },

    addFavoriteOrRemoveRequest: (state) => {
        state.loading = true;
    },
    addFavoriteOrRemoveSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addFavoriteOrRemoveFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // deleteProfileRequest: (state) => {
    //     state.loading = true;
    // },
    // deleteProfileSuccess: (state, action) => {
    //     state.loading = false;
    //     state.message = action.payload;
    // },
    // deleteProfileFailure: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },

    // forgotPasswordRequest: (state) => {
    //     state.loading = true;
    // },
    // forgotPasswordSuccess: (state, action) => {
    //     state.loading = false;
    //     state.message = action.payload;
    // },
    // forgotPasswordFailure: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },

    // resetPasswordRequest: (state) => {
    //     state.loading = true;
    // },
    // resetPasswordSuccess: (state, action) => {
    //     state.loading = false;
    //     state.message = action.payload;
    // },
    // resetPasswordFailure: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },

    // followUserRequest: (state) => {
    //     state.loading = true;
    // },
    // followUserSuccess: (state, action) => {
    //     state.loading = false;
    //     state.message = action.payload;
    // },
    // followUserFailure: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});
