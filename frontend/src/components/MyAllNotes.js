import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import "./MyAllNotes.css"
const MyAllNotes = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState("");
    // const [option, setOption] = useState('')

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {//all space remove

            navigate(`?${keyword}`);

        } else {
            navigate("/");
        }
    };

    // const filterOptionHandler = () => {

    //     if (option) {//all space remove

    //         navigate(`?${option}`);
    //     } else {
    //         navigate("/");
    //     }



    // }

    return (
        <div>

            <div className=" col-md-3 col-sm-3 container my-1">
                <div className="container2 d-flex justify-content-center row ">
                    <div class="  my-2">
                        <form class="navbar-form" role="search">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search Notes..." name="q" onChange={(e) => setKeyword(e.target.value)} />
                                <div class="input-group-btn">
                                    <button class="btn btn-default btn-primary" type="submit"><i class="fa fa-search" onClick={searchSubmitHandler} aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <div class="col-md-3 col-sm-3 col-lg my-2">
                        <form class="navbar-form" role="search">
                            <div class="input-group">
                                <div class="input-group-btn">
                                    <button class="btn btn-default btn-primary" type="submit"><i class="fa fa-search" onClick={searchSubmitHandler} aria-hidden="true">important Notes</i></button>
                                </div>
                            </div>
                        </form>
                    </div> */}
                    {/* <div class="col-md-3 col-sm-3 col-lg my-2" >
                        <select class="form-select" aria-label="Default select example"
                            onChange={e => { setOption(e.target.value) }}
                            onClick={filterOptionHandler}
                        >

                            <option >Filter By (time and date)</option>
                            <option value="last24Hour">Last 24 Hours</option>
                            <option value="LastWeak">Last Weak</option>
                            <option value="Last30Days">Last 30 Days</option>
                        </select>

                    </div> */}

                </div>

                <div class="d-flex my-3 " style={{ color: "black" }}>
                    <hr class="my-auto flex-grow-1" />
                    {/* <div class="px-4">SOME TEXT HERE</div>
                    <hr class="my-auto flex-grow-1" /> */}
                </div>
            </div>
            <h2>All Notes</h2>

        </div>




    )
}

export default MyAllNotes
