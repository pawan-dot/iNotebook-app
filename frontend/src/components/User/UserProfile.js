
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import { useNavigate } from 'react-router';

const UserProfile = () => {
    let navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);
    return (

        <Fragment>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    {/* <img src={user.avatar.url} alt={user.name} /> */}
                    <img src="https://res.cloudinary.com/dsxn6czby/image/upload/v1663583431/c045ulujndimnm8hjvlv.jpg" alt="" />
                    <Link to="/update/profile">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        {/* <p>{user.name}</p> */}
                    </div>
                    <div>
                        <h4>Email</h4>
                        {/* <p>{user.email}</p> */}
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        {/* <p>{String(user.createdAt).substr(0, 10)}</p> */}
                    </div>

                    <div>
                        {/* <Link to="/orders">My Orders</Link> */}
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default UserProfile;
