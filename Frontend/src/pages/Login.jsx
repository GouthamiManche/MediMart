import React, { useEffect, useState } from 'react'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  }; 

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
    <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <div>
      <div id ="signin" className='font-bold py-2 '></div>
            {
              Object.keys(user).length !=0 && <button className="font-bold py-2 px-4" onClick={(e)=>handleSignOut(e)}>Sign Out</button>
            }
    </div> 
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>

    </>
  )
}

export default Login
