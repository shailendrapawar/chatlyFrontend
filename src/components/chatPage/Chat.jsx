import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import { user } from "../loginPage/LoginPage"

import { io } from "socket.io-client"
import { useNavigate } from 'react-router-dom'
import Msg from '../msg/Msg'
import { IoExitOutline } from "react-icons/io5";

const endpoint=import.meta.env.VITE_API_URL;
const socket = io(endpoint)

const Chat = () => {
   
    const navigate = useNavigate()
    const msgRef = useRef();
    const[notify,setNotify]=useState(`Welcome to chat ${user}`)

    const[msgArr,setMsgArr]=useState([]);
    const msgAreaRef=useRef()
    const[activeUsers,setActiveUsers]=useState(0);

   
    const sendMsg = async(e) => {
        e.preventDefault()
        if(msgRef.current.value==""){
            e.preventDefault()
        }else{
           await socket.emit("send", {
                msg:msgRef.current.value,
                userId:socket.id,
                name:user,
                time:
                new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            });
        msgRef.current.value = ""
        }
    }

    useEffect(() => {

        if (user == null) {
            navigate("/")
        }

        socket.emit("enter",{
            userName:user
        })

        socket.on("recieve", (msgs) => {
        
            setMsgArr((msgArr)=>[...msgArr,msgs])
        })

        socket.on("notify",(msg)=>{
            setNotify(msg);
            
        })
        socket.on("update",(msg)=>{
            setActiveUsers(msg)
        })


        
        return ()=> socket.disconnect()


    }, [socket])

    useEffect(()=>{
        if(msgAreaRef.current){
            msgAreaRef.current.scrollTop=msgAreaRef.current.scrollHeight
        }

    },[msgArr])

 

    return (
        <div className=' chat-body'>
            <div className='top-area'><span>{notify}</span><b>ACTIVE:{activeUsers}</b><IoExitOutline onClick={()=>{
                navigate("/")
                socket.disconnect()
                }} className='exit-icon'/></div>
            

            <div className='bottom-area'>
                <div  className='chat-area' id="chat-area" ref={msgAreaRef} >
                
                    {msgArr.map((v, i) => <Msg data={v} key={i} id={socket.id} /> )}

                </div>
                
                <div className='controls-body'>
                    <input ref={msgRef} type='text' placeholder='enter message'></input>
                    <button className='send-btn' onClick={(e)=>sendMsg(e)}> send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat