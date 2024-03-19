import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa'; 
//import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const [user,setUser]=useState({});
  function handleCallbackResponse(response) {
    console.log("encoded: " + response.credential);
    var object = response.credential;
    var userObject = jwtDecode(object);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signin").hidden = true;
}
function handleSignOut(event){
  setUser({});
  document.getElementById("signin").hidden = false;
}
  useEffect(()=>{
//google
google.accounts.id.initialize({
  client_id:"221746536037-24msh502h0uesab03aqi1vo0f3hbf9pi.apps.googleusercontent.com",
  callback:handleCallbackResponse
});
google.accounts.id.renderButton(
  document.getElementById("signin"),
  {theme:"outline",size :"medium"}
);
google.accounts.id.prompt();
  },[])
  return (
    <>
    <div className='flex flex-col h-screen'>
      <div className="">
        <header className="text-black text-l py-4 px-6 flex justify-between items-center bg-blue-100">
          <nav className="flex gap-5 ">
            <Link to="/" className="font-bold">LOGO</Link>
            <div className='flex gap-9'>
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About Us</Link>
            </div>
          </nav>
          <nav className='flex justify-between gap-4'>
          <Link className='py-2 px-4 font-bold text-lg' to="/login">Login</Link>
          {user &&
              // <Link className="font-bold py-2 px-4" >{user.name}</Link>
              <div>
                <h3 className='font-bold py-2 px-4'>{user.name}</h3>
              </div>
              }
            <div>
              
              <Link to="/cart" className="font-bold py-2 px-4 rounded flex items-center">
                <span className="text-lg">Cart</span>
                <span className="text-xl"><FaCartPlus /></span>
              </Link>
              
            </div>
          </nav>
        </header>
      </div>
      </div>
    </>
  )
}

export default Navbar
