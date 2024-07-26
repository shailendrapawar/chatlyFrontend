import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.jsx'
import LoginPage from './components/loginPage/LoginPage.jsx'
import Chat from './components/chatPage/Chat.jsx'

const myRouter=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<LoginPage/>}></Route>
      <Route path='chat' element={<Chat/>} ></Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <RouterProvider router={myRouter}>

    </RouterProvider>
  
)
