import axios from "axios";
import { useState } from "react"


const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });


    const handleInputChange=(e)=>{
        const {name,value} = e.target

        setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
       
    }

    const handleSubmit=async()=>{
    try {
        const UserSinginRequest= await axios.post('http://localhost:5000/api/auth/singin',{
            email:"ram@gmail.com",password:"Ram@1234"
        }, { withCredentials: true })

        console.log(UserSinginRequest)
    } catch (error) {
        console.log(error) 
    }
    }

  return (
    <div className="flex justify-center items-center h-screen">
<div className="card bg-base-300 w-96 shadow-xl ">
  <div className="card-body">
   <div className="flex flex-col gap-2">
   <label htmlFor="">Email ID</label>
   <input type="email"  value={formData.email} name="email" onChange={(e)=>handleInputChange(e)}/>
   </div>
   <div className="flex flex-col gap-2">
   <label htmlFor="">Password</label>
   <input type="password" value={formData.password} name="password" onChange={(e)=>handleInputChange(e)}/>
   </div>

   <div className="flex justify-center my-3">
   <button className="btn w-28" onClick={handleSubmit}>Button</button>
   </div>

  </div>
</div>

    </div>
    
  )
}

export default Login