import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/SignUp';

function App() {
  return (
    <Router >
      <Routes>
       
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/Shop" element={<Shop />}/>
        <Route exact path="/Login" element={<Login />}/>
        <Route exact path="/Signup" element={<Signup/>}/>

        

      </Routes>
    </Router>
  );
}

export default App;
