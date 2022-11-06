import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../action/user"
import ClipLoader from 'react-spinners/ClipLoader';


const Login = (props) => {

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, isAuthenticated, message, error } = useSelector((state) => state.user);

    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(login(email, password));

    };

    useEffect(() => {
        // if (error) {
        //     alert.error(error);
        //     dispatch({ type: "CLEAR_ERRORS" });
        // }

        if (isAuthenticated) {
            props.showAlert('Logged in successfully', "success")
            // navigate("/");
        }
        else {
            props.showAlert('invalid Details', 'danger')
        }
    }, [dispatch, navigate, isAuthenticated]);

    // useEffect(() => {
    //     if (error) {
    //         alert.error(error);
    //         dispatch({ type: "clearErrors" });
    //     }
    //     if (message) {
    //         alert.success(message);
    //         dispatch({ type: "clearMessage" });
    //     }
    //     else {
    //         props.showAlert('invalid Details', 'danger')
    //     }
    // }, [alert, error, dispatch, message]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     //call Backend Api 
    //     const response = await fetch(`${host}/user/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email: credentials.email, password: credentials.password })
    //     });
    //     const json = await response.json()
    //     console.log(json);
    //     if (json.token) {
    //         // Save the auth token and redirect
    //         localStorage.setItem('token', JSON.stringify(
    //             "Bearer " + json.token
    //         ));
    //         console.log(json.token);
    //         //history.push("/");//redirect to home  page
    //         props.showAlert('logged in successfully', "success")
    //         navigate('/') // redirect to home  page

    //     }
    //     else {
    //         props.showAlert('invalid Details', 'danger')
    //     }
    // }


    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate("/");
    //         props.showAlert('logged in successfully', "success")
    //     }
    //     else {

    //         props.showAlert('invalid Details', 'danger')
    //     }


    // }, [navigate, isAuthenticated]);
    // useEffect(() => {
    //     // if (error) {

    //     //     dispatch({ type: "CLEAR_ERRORS" });
    //     // }
    //     if (message) {
    //         //alert.success(message);
    //         // props.showAlert('logged in successfully', "success")
    //         navigate("/")

    //         // dispatch({ type: "CLEAR_MESSAGE" });
    //     }
    //     else {
    //         // props.showAlert('invalid Details', 'danger')
    //     }
    // }, [message, navigate]);

    return (
        <div className=" mt-5 w-70 shadow  p-3 mb-5 bg-body rounded" >
            <h2 className="text-center">Login to continue to iNotebook</h2>
            <div className=" mt-4">
                <form onSubmit={loginSubmit}>
                    <div className="my-3">
                        <label htmlFor="email" className="form-label">Email address :</label>
                        <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password :</label>
                        <input type="password" className="form-control" minLength={8} required onChange={(e) => setPassword(e.target.value)} name="password" />
                    </div>


                    <button type="submit" className="btn btn-primary form-control mt-2">
                        <ClipLoader loading={loading} size={21}
                            color={'black'}
                            aria-label="Loading Spinner"
                            data-testid="loader" />
                        {!loading && "Submit"}</button>
                </form>
            </div>
            <div class="d-flex my-3 " style={{ color: "black" }}>
                <hr class="my-auto flex-grow-1" />
                <div class="px-4"> or </div>
                <hr class="my-auto flex-grow-1" />
            </div>
            {/* <div class="row">
                <button type="submit" className="btn btn-secondary form-control mt-1" >
                    <a class="btn  btn-google btn-block text-uppercase btn-outline text-white" href="#"><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</a>
                </button>


            </div> */}
            <div className='mt-3'>

                <p class="text-inverse text-center">New User? <Link to="/signup" data-abc="true">Register Here</Link></p>
            </div>
        </div>
    )
}

export default Login
