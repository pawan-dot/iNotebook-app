

import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = 'http://localhost:4000';
    const notesInitial = [
        // {
        //     "_id": "6182da88b71fcf11962bd0cbb",
        //     "user": "618069632651b99532870300",
        //     "title": "pawan",
        //     "description": "this is a story book",
        //     "tag": "story",
        //     "createdAt": "2021-11-03T18:52:56.691Z",
        //     "updatedAt": "2021-11-03T18:52:56.691Z",
        //     "__v": 0
        // },

        // {
        //     "_id": "6182da93b71fcf11966bd0cbd",
        //     "user": "618069632651b99532870300",
        //     "title": "pawan",
        //     "description": "this is a story book",
        //     "tag": "story",
        //     "createdAt": "2021-11-03T18:53:07.038Z",
        //     "updatedAt": "2021-11-03T18:53:07.038Z",
        //     "__v": 0
        // },

    ]
    const [notes, setNotes] = useState(notesInitial)



    //Get all notes

    const getAllNote = async () => {
        // Backend Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: 'GET', // 
            headers: {
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem('token')),//get token from localstorage

                //"authorization": "localStorage",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        ///console.log(token)
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        setNotes(json);//display

    }


    //Add a note 
    const addNote = async (title, description, tag) => {
        // Backend Api call
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem('token')),
                // "authorization": "localStorage",//auth token


                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        //return response.json(); // parses JSON response into native JavaScript objects

        // eslint-disable-next-line

        //front end adding(client side)
        // const note = {
        //     "_id": "6182da93b71fcf1ghenbnj1966bd0cbd",
        //     "user": "618069632651b995328744443jh00",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "createdAt": "2021-11-03T18:53:07.038Z",
        //     "updatedAt": "2021-11-03T18:53:07.038Z
        // };
        console.log("Adding a new note")
        const note = await response.json();
        setNotes(notes.concat(note))//return new array


    }




    //edit a note
    const editNote = async (id, title, description, tag) => {
        // Backend Api call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem('token')),//get token from localstorage
                //"authorization":localStorage.getItem('token')


                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
            //body: JSON.stringify() // body data type must match "Content-Type" header
        });
        //return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json)

        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))//we make new notes then update

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    //delete a note
    const deleteNote = async (id) => {

        // Backend DeleteNote Api call
        const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
            method: 'DELETE', // 
            headers: {
                'Content-Type': 'application/json',

                "authorization": JSON.parse(localStorage.getItem('token')),//get token from localstorage

                // "authorization": "localStorage",//auth token


                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        //console.log(token)
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)


        //front-end delete but not data base
        console.log("deleting the node with id=" + id)

        const newNotes = notes.filter((note) => note._id !== id)
        setNotes(newNotes)
    }





    //just learn contaxt api
    // const s1 = {
    //     "name": "pawan",
    //     "class": "6d"
    // }
    // const [state, setState] = useState(s1)
    // const update = () => {//update state
    //     setTimeout(() => {
    //         setState({
    //             "name": "rahul",
    //             "class": "7j"
    //         })
    //     }, 1000);
    // }
    return (
        // <NoteContext.Provider value={{ state, update }}>//java script modern use while old is state:state,update:update

        <NoteContext.Provider value={{ notes, getAllNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;

