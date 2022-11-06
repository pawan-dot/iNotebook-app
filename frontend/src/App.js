//import React from 'react'

//import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
// import Searchbar from './components/Searchbar';
// import Userprofile from './components/userprofile';
import UserProfile from './components/User/UserProfile';
// import Footer from './components/footer';
//import Footer from './components/Footer';
import { useSelector, useDispatch } from "react-redux";
import store from './store';
import { loadUser } from './action/user';
function App() {
  // const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);

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
              {/* {isAuthenticated && <Route path="/" element={<Home showAlert={showAlert} />} />} */}
              <Route path="/" element={isAuthenticated ? <Home showAlert={showAlert} /> : <Login showAlert={showAlert} />} />
              {/* <Route path="/" element={<Home showAlert={showAlert} />} /> */}

              {/* <Route path="/search" element={< Searchbar />} /> */}
              <Route path="/about" element={<About />} />
              {isAuthenticated && <Route path="/account" element={<UserProfile />} />}


            </Routes>

          </div>
          <Footer />
        </BrowserRouter>

      </NoteState>

    </>

  );
}

export default App;
