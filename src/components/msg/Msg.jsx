import React from 'react'
import './msg.css'
const Msg = ({data, id}) => {
    console.log(id)
  return (
    <div className='msg-body' style={id==data.userId?{alignSelf:"flex-end", border:"3px solid aqua", backgroundColor:"#A0DEFF"}:{alignSelf:"flex-start"}}>
        <b style={id==data.userId?{right:"10px"}:{left:"10px",color:"green"}} >{id==data.userId?"YOU":data.name}</b>
        <p>{data.msg}</p>
        <i style={id==data.userId?{left:"10px"}:{right:"10px"}} >{data.time}</i>
    </div>
  )
}


export default Msg