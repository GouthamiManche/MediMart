import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy,Suspense } from 'react';
import Loader from './Components/Loader';
const Home = lazy(()=>import('./pages/Home'));
const Shop =lazy(()=>import('./pages/Shop'));
const Login = lazy(()=>import('./pages/Login'));
const Signup =lazy(()=>import('./pages/SignUp'));
const Cart = lazy(()=>import('./pages/Cart'));
function App() {
  return (
    <Router >
     <Suspense fallback={<Loader/>}>
     <Routes>      
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/Shop" element={<Shop />}/>
        <Route exact path="/Login" element={<Login />}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/Cart" element={<Cart/>}/>
      </Routes>
     </Suspense>
    </Router>
  );
}

export default App;
