import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import ProtectedRouter from "./proctedRouter"
import Feed from "./Feed"


function App() {
  

  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>

    <Route element={<ProtectedRouter/>}>
     <Route path="/feed" element={<Feed/>}/>

  
    </Route>
   </Routes>
   
   </BrowserRouter>
    </>
  )
}

export default App
