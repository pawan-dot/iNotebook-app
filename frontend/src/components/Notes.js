
import React, { useEffect, useRef, useState } from 'react'
import Pagination from './Pagination';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllNotes, editNotes } from '../action/Notes';
import { useDispatch, useSelector } from 'react-redux';
import MyAllNotes from './MyAllNotes';


const Notes = (props) => {
    const dispatch = useDispatch();
    let location = useLocation();


    const ref = useRef(null)
    const refClose = useRef(null)


    const keyword = location.search.slice(3)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const { error, message, notes } = useSelector((state) => state.Notes)
    // console.log(notes)






    useEffect(() => {
        if (error) {
            props.showAlert(' Failled to Edit Note', "danger")
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            props.showAlert(' Notes Edited Successfully', "success")

            dispatch({ type: "clearMessage" });
        }

        dispatch(getAllNotes(keyword));
    }, [keyword, error, message]);




    const updateNote = (currentNote) => {
        ref.current.click();//reference value  current click 
        // console.log(currentNote._id)
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }


    const handleClick = (e) => {

        e.preventDefault();//not reload page didable becase update note not part of form
        dispatch(editNotes(note.id, note.etitle, note.edescription, note.etag))//edit note through form
        refClose.current.click();//close modool
        // props.showAlert('Updated successfully', "success")
    }


    // const handleClick = (e) => {
    //     //editNote(note.id, note.etitle, note.edescription, note.etag)
    //     refClose.current.click();
    // }




    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage] = useState(16)

    const indexOfLastPost = currentPage * itemPerPage
    const indexOfFirstPost = indexOfLastPost - itemPerPage
    const currentNotes = notes ? notes.slice(indexOfFirstPost, indexOfLastPost) : null

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <div className='w-100' style={{ width: "100vh", hight: "100vh" }}>
                {location.pathname === '/new' ? <AddNote showAlert={props.showAlert} /> : <MyAllNotes showAlert={props.showAlert} />}


                {/* use java script to oppen modol */}
                {/* <!-- Button trigger modal --> */}
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* edit note form */}
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required cols="15" rows="3"></textarea>

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>

                                </form>

                                {/* form end */}
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--------model end ------------*/}
                <div className="row my-3">
                    {/* <h2>Your Notes</h2> */}
                    {/* <div className="container mx-2">
                    
                </div> */}

                    {currentNotes && currentNotes.length > 0 ? currentNotes.map((note, index) => {
                        return (<>
                            <Noteitem key={index} updateNote={updateNote} showAlert={props.showAlert} note={note} />

                        </>)

                    }) : <>
                        <div className="container mx-2">
                            No Notes to display..
                        </div></>
                    }
                    <div className=" my-4" >
                        {notes && notes.length > itemPerPage ? <>< Pagination itemPerPage={itemPerPage}
                            totalNotes={notes ? notes.length : 0}
                            paginate={paginate} /></> : <></>}


                    </div>

                </div>
            </div>
        </>
    )
}

export default Notes