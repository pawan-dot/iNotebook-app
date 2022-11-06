import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, getAllNotes } from '../action/Notes';

const AddNote = (props) => {//srtalert is comming from props
    const dispatch = useDispatch();

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const { error, message } = useSelector((state) => state.Notes)
    const handleClick = (e) => {

        e.preventDefault();//not reload page
        //addNote(note);
        dispatch(addNotes(note.title, note.description, note.tag))
        // addNote(note.title, note.description, note.tag);//add note
        setNote({ title: "", description: "", tag: "" })//after adding note place will be empty


    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })//spread operator to change notes
    }
    useEffect(() => {
        if (error) {
            props.showAlert(' Failled to Adde Note', "danger")
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            // props.showAlert(' Notes Added', "success")
            dispatch(getAllNotes())

            dispatch({ type: "clearMessage" });
        }

    }, [error, message, dispatch, getAllNotes()])
    return (
        <div>

            <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="titlelHelp" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>

                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>

            </div>
            <h2>Recent Notes</h2>
        </div>
    )
}

export default AddNote
