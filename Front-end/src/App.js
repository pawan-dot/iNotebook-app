//import React from 'react'

import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Searchbar from './components/Searchbar';
function App() {
  const [alert, setAlert] = useState(null);
  //alert function
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>





        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">


            <Routes>
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/search" element={< Searchbar />} />
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />

            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>

  );
}

export default App;
