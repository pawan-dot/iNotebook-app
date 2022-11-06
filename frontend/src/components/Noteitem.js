import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import "./Noteitem.css"
import { useDispatch } from 'react-redux';
import { deleteNotes, addFavoriteOrRemove } from '../action/Notes';




const Noteitem = (props) => {//srtalert is comming from props 
    const dispatch = useDispatch();

    const [show, setShow] = useState(false)


    const { note, updateNote } = props
    // console.log(note)
    // delete notes----------------------------
    const deleteNote = (id) => {
        // e.preventDefault();//not reload page
        alert('Are you sure..')
        dispatch(deleteNotes(id))
    }
    // ------------------------------------
    // set addFavoriteOrRemove--------------------
    const addFavoriteOrRemoves = (id) => {
        // e.preventDefault();//not reload page
        dispatch(addFavoriteOrRemove(id))
    }
    // ----------------------------------------


    //am pm
    function formatAMPM(date) {
        var hours = new Date(date).getHours();
        var minutes = new Date(date).getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    //for view models
    const handleShow = () => setShow(true)
    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <div className="col-md-3">


                <div className="card my-3" >
                    <div className="card-body cardPro" >
                        <div className="d-flex float-end">
                            <i className="fas fa-trash-alt mx-2 " onClick={() => { deleteNote(note._id); props.showAlert('Deleted successfully', "success") }}></i>
                            {/* we make arrow fn because we pass argument */}
                            <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>

                            {note.favorite && note.favorite === true ?
                                <i class="fa fa-heart mx-2" aria-hidden="true" onClick={() => { addFavoriteOrRemoves(note._id); props.showAlert('Remove favorite', "success") }}></i> :
                                <i class="fa fa-heart-o mx-2" onClick={() => { addFavoriteOrRemoves(note._id); props.showAlert('Added to favorite', "success") }} aria-hidden="true"></i>
                            }
                        </div>
                        <div className="d-flex align-items-center ">
                            <h5 className="card-title text-truncate">{note.title}</h5>

                        </div>

                        <p className=" card-text text-truncate"> {note.description} </p>

                        <i class="fa fa-eye" aria-hidden="true" onClick={() => handleShow()}></i>


                        <i class="fa fa-calendar float-end" aria-hidden="true">
                            <span className='mx-2'>
                                {new Date(`${note.createdAt}`).toDateString()} <span span > , {`${formatAMPM(note.createdAt)}`}
                                </span>
                            </span>
                        </i>
                    </div>
                </div>

            </div>
            {/* view model start */}
            <Modal show={show} onHide={handleClose} className="p-4">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Note Details</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <CForm onSubmit={(e) => forgotMail(e)} validated={isfValid} id="forgot-form" noValidate>
                            <div>Please enter your email:</div>
                            <CFormInput
                                onBlur={() => setTouched(true)}
                                onChange={handleEmailChange}
                                valid={errors.forgotEmailError}
                                invalid={!errors.forgotEmailError}
                                type="email"
                                value={email}
                                style={{ marginTop: '10px', borderRadius: '7px', padding: '8px' }}
                                placeholder="Email"
                                required
                            />
                        </CForm> */}
                    <div className="mb-3">
                        <h5 htmlFor="title" className="form-label"> <u>Title:</u></h5>
                        <p className='ml-2'>{note.title}</p>

                    </div>
                    <div className="mb-3">
                        <hr />
                        <h5 htmlFor="description" className="form-label"><u>Description:</u></h5>
                        <span className='ml-2'>{note.description}</span>

                    </div>
                    <div className="mb-3">
                        <hr />
                        <h5 htmlFor="tag" className="form-label text-decoration-underline"> Tag:</h5>
                        <p className='ml-2'>{note.tag}</p>

                    </div>
                    <div className="mb-3">
                        <hr />
                        <div> <p htmlFor="tag" className="form-label">Added <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                            <i class="fa fa-calendar float-end" aria-hidden="true">
                                <span className='mx-2'>
                                    {new Date(`${note.createdAt}`).toDateString()} <span span > , {`${formatAMPM(note.createdAt)}`}
                                    </span>
                                </span>
                            </i></p></div>
                        <div className=" mt-2">
                            <p htmlFor="tag" className="form-label">Updated <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                                <i class="fa fa-calendar float-end" aria-hidden="true">
                                    <span className='mx-2'>
                                        {new Date(`${note.updatedAt}`).toDateString()} <span span > , {`${formatAMPM(note.updatedAt)}`}
                                        </span>
                                    </span>
                                </i></p>
                        </div>





                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button variant="primary" form="forgot-form" type="submit">
                            Forgot Password
                        </Button> */}
                </Modal.Footer>
            </Modal>

            {/* view model end */}
        </>
    )
}

export default Noteitem;
