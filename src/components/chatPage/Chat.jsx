import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import { user } from "../loginPage/LoginPage"

const endpoint = "http://localhost:3000"
import { io } from "socket.io-client"
import { useNavigate } from 'react-router-dom'
import Msg from '../msg/Msg'
import ReactScrollToBottom from 'react-scroll-to-bottom'
const socket = io(endpoint)
// let userId=socket.id;
const Chat = () => {
   
    const navigate = useNavigate()
    const msgRef = useRef();
    const[notify,setNotify]=useState("")

    const[msgArr,setMsgArr]=useState([]);
    const msgAreaRef=useRef()

   
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
            // setMsgArr([...msgArr,msgRef.current.value])
        msgRef.current.value = ""
        }
    }

    useEffect(() => {

        if (user == null) {
            navigate("/")
        }
   

        socket.on("recieve", (msgs) => {
        
            setMsgArr((msgArr)=>[...msgArr,msgs])
        })

        socket.on("notify",(msg)=>{
            setNotify(msg);
        })
        



    }, [socket])

    useEffect(()=>{
        if(msgAreaRef.current){
            msgAreaRef.current.scrollTop=msgAreaRef.current.scrollHeight
        }

    },[msgArr])

 

    return (
        <div className=' chat-body'>
            <h2>{notify}</h2>

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