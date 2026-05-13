import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import LoginAcessHandler from "./components/LoginAccessHandler";
import Typing from "../pages/Typing";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  function homePgAccess(element) {
    if (isAuthenticated) {
      return element;
    }
    else {
      return <Login />;
    }
  }

  // if (loading) {
  //   return <div>Loading...</div>; // or spinner
  // }

  return (
    <>
      <LoginAcessHandler setIsAuthenticated={setIsAuthenticated} setLoading={setLoading} />
      <Routes>
        <Route path="/" element={<Typing />} />
        <Route path="/login" element={isAuthenticated ? <Typing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Typing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> : <Signup />} />
        <Route path='/home' element={<Typing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/normal" element={homePgAccess(<Typing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
        <Route path="/survival" element={homePgAccess(<Typing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
      </Routes>
      <ToastContainer />

    </>
  )
}

export default App
