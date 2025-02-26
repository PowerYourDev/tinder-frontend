
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "./Redux/reduxThunk/userThunk";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const {error,data,loading}=useSelector((store)=>store.userSlice)

console.log(error,data,loading)
    const [formData, setFormData] = useState({
        email: "ram@gmail.com",
        password: "Ram@1234"
      });


    const handleInputChange=(e)=>{
        const {name,value} = e.target

        setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
       
    }

    const handleSubmit=async()=>{
   

      // Dispatch the userSignin thunk
      dispatch(userSignin(formData));
      
    }
    useEffect(()=>{
   if(data){
    navigate('/feed')
   }
    },[data,navigate])

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
   <button className="btn w-28" onClick={handleSubmit}>Sign In</button>
   </div>
   {
    error&& <p className="text-red-400">{error?.response?.data.message}</p>
   }

  </div>
</div>

    </div>
    
  )
}

export default Login