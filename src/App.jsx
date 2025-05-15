import React, { Suspense } from 'react';

import ProtectedRouter from "./proctedRouter"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdatingPassword from './Auth/UpdatingPassword';


const FeedPage=  React.lazy(()=>import('./Pages/FeedPage')) 
const Login=  React.lazy(()=>import('./Auth/Login')) 
const ProfileUpdate= React.lazy(()=>import('./Pages/ProfileUpdate'))
const Connection= React.lazy(()=>import('./Pages/ConnectionPage'))
const ConnectionRequest= React.lazy(()=>import('./Pages/connectionRequest'))
const Chat= React.lazy(()=>import('./Pages/ChatPage'))
const ForgotPassword= React.lazy(()=>import('./Auth/ForgotPassword'))


function App() {
  

  return (
    <>
   <BrowserRouter>
   <ToastContainer />
   <Suspense fallback={<div>Loading... Please wait...</div>}>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:token" element={<UpdatingPassword/>}/>

    <Route element={<ProtectedRouter/>}>

     <Route path="/feed" element={<FeedPage/>}/>
     <Route path="/profile" element={<ProfileUpdate/>}/>
     <Route path="/connections" element={<Connection/>}/>
     <Route path="/Connections-requestes" element={<ConnectionRequest/>}/>
     <Route path="/chat/:userRequestId" element={<Chat/>}/>






  
    </Route>
   </Routes>
 
   </Suspense>
   
   </BrowserRouter>
    </>
  )
}

export default App
