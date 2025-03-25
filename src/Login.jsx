
import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userSignin,userSingUp } from "./Redux/reduxThunk/userThunk";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";


const Login = () => {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;


  const {error,data,loading}=useSelector((store)=>store.userSlice)

  const [singIn,setSignIn]=useState(false)

  const handleSingIn=()=>{
    setSignIn(!singIn)
  }

console.log(error,data,loading)

    


    

    const onSubmit=async(data)=>{
     const {email,
      password,
      lastName,
      firstName}=data
   

      // Dispatch the userSignin thunk
     const response= await dispatch(singIn?userSignin({email,password}):userSingUp({email,password,lastName,firstName}));
     console.log(response)

     if(response.payload.status==200){
      toast.success("login successfull")
      navigate('/feed')
     }else{
      toast.error("something went Wrong please.. try again ")
     }
      
    }
 

  return (
    <div>

    <div className="flex justify-center items-center h-screen bg-[url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')]">
<div className="card bg-[rgba(0,0,0,0.7)] w-96 shadow-xl text-white ">
<form noValidate
        onSubmit={handleSubmit(onSubmit)}>
  <div className="card-body">
  <h3 className="font-bold text-[2rem] mb-4">{singIn?"Sign In": "Sign Up"}</h3>
    {!singIn &&<>
  <div className="flex flex-col gap-2">
   {/* <label htmlFor="">First Name</label> */}
   <input type="text" className="bg-transparent border p-1.5 rounded-md "   name="firstName" placeholder="First Name"              {...register("firstName", {
                required: {
                  value: true,
                  message: "firstName is required",
                },
                minLength: {
                  value: 3,
                  message: "FirstName must be at least 3 characters",
                },
              })}
/>
{ errors?.firstName && (
            <p className="text-red-500">{errors?.firstName?.message}</p>
          )}

   </div>
   <div className="flex flex-col gap-2">
   {/* <label htmlFor="">Last Name</label> */}
   <input type="text"   name="lastName" className="bg-transparent border p-1.5 rounded-md "  placeholder="Last Name" 
    {...register("lastName", {
      required: {
        value: true,
        message: "lastName is required",
      },
    })}



   />
   { errors?.lastName && (
            <p className="text-red-500">{errors?.lastName?.message}</p>
          )}
   </div>
   </>
}


   <div className="flex flex-col gap-2">
   {/* <label htmlFor="">Email ID</label> */}
   <input type="email"   name="email" placeholder="Email" className="bg-transparent border p-1.5 rounded-md " 
    {...register("email", {
      required: {
        value: true,
        message: "email is required",
      },
      pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "invalid email",
      },
    })}
   />
   {errors?.email && (
            <p className="text-red-500">{errors?.email?.message}</p>
          )}
   </div>
   <div className="flex flex-col gap-2">
   {/* <label htmlFor="">Password</label> */}
   <input type="password"  name="password" placeholder="Password" className="bg-transparent border  p-1.5 rounded-md "  
    {...register("password", {
      required: { value: true, message: "password is required" },
      pattern: {
        value:
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must be at least 8 characters and include a letter, a digit, and a special character.",
      },
    })}
   />
    {errors?.password && (
            <p className="text-red-500">{errors?.password?.message}</p>
          )}
   </div>

   <div className="flex justify-center my-3">
   <button type="submit" className="bg-[#E50914] p-2 rounded-md mt-8 cursor-pointer w-full" >{singIn ?"Sign In" :"sign Up"}</button>
   </div>


   {
    singIn ? <p className="font-normal text-base text-[rgba(255,255,255,0.7)]">New to dev-conect? <u onClick={handleSingIn} className="font-medium text-[rgb(255,255,255)] cursor-pointer"> Sign Up</u></p>: <p className="font-normal text-base text-[rgba(255,255,255,0.7)]">Already registered?  <u onClick={handleSingIn} className="font-medium text-[rgb(255,255,255)] cursor-pointer">Sign In</u> </p> 
   }
   {
    error&& <p className="text-red-400">{error?.response?.data.message}</p>
   }

  </div>
  </form>
</div>

    </div>

    </div>
    
  )
}

export default Login