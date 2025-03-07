
import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userSignin,userSingUp } from "./Redux/reduxThunk/userThunk";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const {error,data,loading}=useSelector((store)=>store.userSlice)

  const [singIn,setSignIn]=useState(false)

  const handleSingIn=()=>{
    setSignIn(!singIn)
  }

console.log(error,data,loading)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        lastName:"",
        firstName:"",
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
     const response= await dispatch(singIn?userSignin(formData):userSingUp(formData));
     console.log(response)

     if(response.payload.status==200){
      navigate('/feed')
     }
      
    }
  //   useEffect(()=>{
  //  if(data){
  //   navigate('/feed')
  //  }
  //   },[data,navigate])

  return (
    <div className="flex justify-center items-center h-screen">
<div className="card bg-base-300 w-96 shadow-xl ">
  <div className="card-body">
    {!singIn &&<>
  <div className="flex flex-col gap-2">
   <label htmlFor="">First Name</label>
   <input type="text"  value={formData.firstName} name="firstName" onChange={(e)=>handleInputChange(e)}/>
   </div>
   <div className="flex flex-col gap-2">
   <label htmlFor="">Last Name</label>
   <input type="text"  value={formData.lastName} name="lastName" onChange={(e)=>handleInputChange(e)}/>
   </div>
   </>
}


   <div className="flex flex-col gap-2">
   <label htmlFor="">Email ID</label>
   <input type="email"  value={formData.email} name="email" onChange={(e)=>handleInputChange(e)}/>
   </div>
   <div className="flex flex-col gap-2">
   <label htmlFor="">Password</label>
   <input type="password" value={formData.password} name="password" onChange={(e)=>handleInputChange(e)}/>
   </div>

   <div className="flex justify-center my-3">
   <button className="btn w-28" onClick={handleSubmit}>{singIn ?"Sign In" :"sign Up"}</button>
   </div>


   {
    singIn ? <p>create an account <u onClick={handleSingIn} className="cursor-pointer"> Sign Up</u></p>: <p>alredy have an account <u onClick={handleSingIn} className="cursor-pointer">Sign In</u> </p> 
   }
   {
    error&& <p className="text-red-400">{error?.response?.data.message}</p>
   }

  </div>
</div>

    </div>
    
  )
}

export default Login