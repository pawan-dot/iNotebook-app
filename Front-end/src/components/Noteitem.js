import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {//srtalert is comming from props 
    const context = useContext(NoteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props
    return (
        <div className="col-md-3">


            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); props.showAlert('Deleted successfully', "success") }}></i>
                        {/* we make arrow fn because we pass argument */}
                        <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>

                    <p className="card-text"> {note.description} </p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem;
