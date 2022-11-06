import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../action/user"


const Navbar = () => {
    const dispatch = useDispatch();

    let navigate = useNavigate();
    let location = useLocation();
    const { loading, isAuthenticated, message, error } = useSelector((state) => state.user);
    // const [userProp] = useState(message.data.user)
    console.log(message.data.user)

    React.useEffect(() => {
        // console.log(location.pathname)// print location path

    }, [location]);

    const handleLogout = () => {
        dispatch(logout)


        navigate('/login')


    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" stype={{ position: "fixed" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand mx-5" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mx-5 mb-lg-0">
                            <li className="nav-item">
                                {/* className={`nav-link${location.pathname === '/mynotes' ? 'active' : ""}`} */}
                                <Link className={`nav-link${location.pathname === '/' ? 'active' : ""}`} to="/"> My Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link${location.pathname === '/new' ? 'active' : ""}`} to="/new" >Add Note</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
                            </li>

                        </ul>





                        {isAuthenticated === false ? <form className="d-flex ">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form> :
                            <form>
                                <div class="dropdown">

                                    <Link class="btn btn-primary dropdown-toggle mx-5 " to="#" role="button " id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        pawan ku
                                        {/* {userProp.name} */}
                                        {/* <img className='w-25' src="https://res.cloudinary.com/dsxn6czby/image/upload/v1663583431/c045ulujndimnm8hjvlv.jpg" alt="" /> */}
                                    </Link>

                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                                        <li><Link class="dropdown-item" to="/account">Edit Profile</Link></li>

                                        <button onClick={handleLogout} class="dropdown-item mx-1" > Logout</button >




                                    </ul>
                                </div>
                            </form>

                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;

