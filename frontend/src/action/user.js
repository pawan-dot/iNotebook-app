import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LOGIN_REQUEST",
        });

        const { data } = await axios.post(
            "/api/user/login",
            {
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "LOGIN_FAILURE",
            payload: error.response.data.message,
        });
    }
};


export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_USER_REQUEST" });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/user/register`, userData, config);

        dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
    } catch (error) {
        dispatch({
            type: "REGISTER_USER_FAIL",
            payload: error.response.data.message,
        });
    }
};
// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" });
        const data = await axios.get(`/api/user/me`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: data,

        });
        console.log(data.user)
        // dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
    } catch (err) {
        dispatch({
            type: "LOAD_USER_FAILURE",
            payload: err.response.data.message,
        });
        // dispatch({ type: "LOAD_USER_FAILURE", payload: error.response.data.message });
    }
};
// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/user/logout`);

        dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
        dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
    }
};