import React, { useState, useContext } from "react";

import { AuthContext } from '../Components/AuthProvider';

function Profile() {
  
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
    <div>Profile</div>
    <div>{}</div>
    </div>
  )
}

export default Profile