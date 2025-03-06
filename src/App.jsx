import React, { Suspense } from 'react';

import ProtectedRouter from "./proctedRouter"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const FeedPage=  React.lazy(()=>import('./Pages/FeedPage')) 
const Login=  React.lazy(()=>import('./Login')) 
const ProfileUpdate= React.lazy(()=>import('./Pages/ProfileUpdate'))
const Connection= React.lazy(()=>import('./Pages/ConnectionPage'))
const ConnectionRequest= React.lazy(()=>import('./Pages/connectionRequest'))


function App() {
  

  return (
    <>
   <BrowserRouter>
   <Suspense fallback={<div>Loading... Please wait...</div>}>
   <Routes>
    <Route path="/" element={<Login/>}/>

    <Route element={<ProtectedRouter/>}>
     <Route path="/feed" element={<FeedPage/>}/>
     <Route path="/profile" element={<ProfileUpdate/>}/>
     <Route path="/connections" element={<Connection/>}/>
     <Route path="/Connections-requestes" element={<ConnectionRequest/>}/>



  
    </Route>
   </Routes>
   </Suspense>
   
   </BrowserRouter>
    </>
  )
}

export default App
