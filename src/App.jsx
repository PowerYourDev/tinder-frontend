import React, { Suspense } from 'react';

import ProtectedRouter from "./proctedRouter"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const FeedPage=  React.lazy(()=>import('./Pages/FeedPage')) 
const Login=  React.lazy(()=>import('./Login')) 


function App() {
  

  return (
    <>
   <BrowserRouter>
   <Suspense fallback={<div>Loading... Please wait...</div>}>
   <Routes>
    <Route path="/" element={<Login/>}/>

    <Route element={<ProtectedRouter/>}>
     <Route path="/feed" element={<FeedPage/>}/>

  
    </Route>
   </Routes>
   </Suspense>
   
   </BrowserRouter>
    </>
  )
}

export default App
