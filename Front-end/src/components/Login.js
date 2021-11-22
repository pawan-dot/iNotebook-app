import React, { useState } from 'react'
//import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const host = 'http://localhost:4000';


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    //let history = useHistory();//for login
    const navigate = useNavigate();//for login

    const handleSubmit = async (e) => {
        e.preventDefault();

        //call Backend Api 
        const response = await fetch(`${host}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.token) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authorization);
            console.log('token');
            //history.push("/");//redirect to home  page
            props.showAlert('logged in successfully', "success")
            navigate('/') // redirect to home  page

        }
        else {
            props.showAlert('invalid Details', 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })//edit update credintial
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
