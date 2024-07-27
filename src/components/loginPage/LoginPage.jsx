
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
 

    if(name!==""){
        localStorage.setItem("chat_userName",name);
        navigate("/chat")

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
        <h2 className=''>Chatly</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            id="name"
            value={name}
            placeholder='enter your name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">enter chat</button>
      </form>
    </div>
  );
}

export default LoginPage;
export {user}

