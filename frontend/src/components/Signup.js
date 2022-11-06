import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../action/user';
import Swal from 'sweetalert2'
import "./Signup.css"
import ClipLoader from "react-spinners/ClipLoader"

const Signup = (props) => {//srtalert is comming from props 
    const dispatch = useDispatch();
    let navigate = useNavigate(); //for login
    const [image, setImage] = useState("");

    const [imagesPreview, setImagesPreview] = useState();
    // const { isAuthenticated } = useSelector(
    //     (state) => state.user
    // );
    const { loading, isAuthenticated, message, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // const { name, email, password } = user;



    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });//edit update credintial
    }

    //handle image
    const handleImage = (e) => {
        const files = e.target.files[0];

        // console.log(files)
        setImage(files);
        // only for file preview------------------------------------
        const Reader = new FileReader();
        Reader.readAsDataURL(files);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImagesPreview(Reader.result);
            }
        };


        // -----------------------------------------------------------------------------
    };

    const handleSubmit = async (e) => {
        e.preventDefault();//not reload page
        if (user.password != user.confirmPassword) {
            // Swal({
            //     title: 'Warning',

            //     icon: 'error',
            //     button: 'Close',
            //     dangerMode: true,
            // })
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password and Confirm Password does not Match!',

            })
            return
        }
        const myForm = new FormData();

        myForm.set("name", user.name);
        myForm.set("email", user.email);
        myForm.set("password", user.password);
        myForm.set('avatar', image)

        dispatch(register(myForm));
    }
    useEffect(() => {
        // if (error) {
        //     dispatch(clearErrors());
        // }

        if (isAuthenticated) {
            props.showAlert('Register Successfully', "success")
            navigate("/");
        }
    }, [dispatch, navigate, isAuthenticated]);
    return (
        <div className=" w-75 shadow  p-3 mb-5 bg-body rounded container mt-1"  >

            <h2 className="text-center">Register to iNotebook </h2>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name :</label>
                        <input type="text" className="form-control" id="name" value={user.name} name="name" required onChange={onChange} aria-describedby="namehelp" />
                        <div id="name" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address :</label>
                        <input type="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" className="form-control" id="email" name="email" value={user.email} required onChange={onChange} aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password :</label>
                        <input type="password" className="form-control" id="password" name="password" minLength={8} required value={user.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Confirm Password :</label>
                        <input type="password" className="form-control" id="password" minLength={8} name="confirmPassword" required value={user.confirmPassword} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">image:</label>
                        <input type="file" className="form-control ml-5" id="password" name="avatar"
                            placeholder="image"
                            accept="image/*"
                            required
                            onChange={handleImage}


                        />
                        <div id="createProductFormImage" className="w-50 d-flex">

                            {imagesPreview && <img className=" w-25 p-1 " src={imagesPreview} alt="Product Preview" />}

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary form-control mt-1" >
                        <ClipLoader loading={loading} size={21}
                            color={'black'}
                            aria-label="Loading Spinner"
                            data-testid="loader" />
                        {!loading && "Submit"}
                    </button>
                </form>
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

                    <p class="text-inverse text-center">Already have an account? <Link to="/login" data-abc="true">Login</Link></p>
                </div>
            </div>


        </div>



    )
}

export default Signup;


{/* <section class="login-block">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <form class="md-float-material form-material" action="#" method="POST">
                                <div class="auth-box card">
                                    <div class="card-block">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h3 class="text-center heading" >SignUp</h3>

                                            </div>
                                        </div>
                                        <div class="form-group form-primary">

                                            <input type="text" class="form-control" name="first_name" value="" placeholder="Name" id="first_name" />
                                        </div>

                                        <div class="form-group form-primary">
                                            <input type="email" class="form-control" name="email" value="" placeholder="Email" id="email" />

                                        </div>

                                        <div class="form-group form-primary">
                                            <input type="password" class="form-control" name="password" placeholder="Password" value="" id="password" />

                                        </div>

                                        <div class="form-group form-primary">
                                            <input type="password" class="form-control" name="password_confirm" placeholder="Repeat password" value="" id="password_confirm" />

                                        </div>
                                        <div class="form-group form-primary">
                                            <input type="file" class="form-control" name="image" value="" placeholder="image" id="image" />

                                        </div>

                                        <div class="row">


                                            <input type="submit" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" name="submit" value="Signup Now" />

                                        </div>

                                        <div class="or-container"><div class="line-separator"></div> <div class="or-label">or</div><div class="line-separator"></div></div>


                                        <div class="row">

                                            <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#"><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</a>


                                        </div>
                                        <br />

                                        <p class="text-inverse text-center">Already have an account? <a href="<?= base_url() ?>auth/login" data-abc="true">Login</a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section> */}