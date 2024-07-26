// src/Login.js

import React, { useEffect, useState } from 'react';
import './login.css';

import { useNavigate } from "react-router-dom"
let user;
function LoginPage() {

  const [name, setName] = useState('');
const navigate=useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault();
    user=document.getElementById("name").value
    // console.log(user);

    if(name!==""){
        localStorage.setItem("chat_userName",name);
        navigate("/chat")
        // console.log(name)
    }else{
        alert("enter name first")
    }
    
  }


  useEffect(()=>{
    return ()=> localStorage.removeItem("chat_userName")

  },[])

  return (
    <div className="login-container ">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className=''>Login</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
export {user}

