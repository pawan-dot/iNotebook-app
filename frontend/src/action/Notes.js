import axios from "axios";
export const addNotes = (title, description, tag) => async (dispatch) => {
    try {
        dispatch({
            type: "addNotesRequest",
        });

        const { data } = await axios.post(`/api/notes/addNotes`,
            {
                title,
                description,
                tag
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: "addNotesSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "addNotesFailure",
            payload: error.response.data.message,
        });
    }
};
export const getAllNotes = (keyword = "", currentPage = 1) => async (dispatch) => {
    try {
        dispatch({
            type: "getNotesRequest",
        });

        const { data } = await axios.get(`/api/notes/getAll?keyword=${keyword}&page=${currentPage}`);
        dispatch({
            type: "getNotesSuccess",
            payload: data.notes,
        });
    } catch (error) {
        dispatch({
            type: "getNotesFailure",
            payload: error.response.data.message,
        });
    }
};

export const editNotes = (id, title, description, tag) => async (dispatch) => {
    try {
        dispatch({
            type: "updateNotesRequest",
        });

        const { data } = await axios.put(
            `/api/notes/edit/${id}`,
            {
                title,
                description,
                tag
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: "updateNotesSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "updateNotesFailure",
            payload: error.response.data.message,
        });
    }
};
export const addFavoriteOrRemove = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "addFavoriteOrRemoveRequest",
        });

        const { data } = await axios.get(
            `/api/notes/addFavoriteOrRemove/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: "addFavoriteOrRemoveSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "addFavoriteOrRemoveFailure",
            payload: error.response.data.message,
        });
    }
};


export const deleteNotes = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteNotesRequest",
        });

        const { data } = await axios.delete(
            `/api/notes/delete/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: "deleteNotesSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteNotesFailure",
            payload: error.response.data.message,
        });
    }
};

