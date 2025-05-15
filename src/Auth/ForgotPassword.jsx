import { useForm } from "react-hook-form";
import { BASE_URL } from "../utilis/constant";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
      const { register, handleSubmit, formState } = useForm();
      const { errors } = formState;

      const [message,setMessage]=useState({open:false,message:null})

      const handleForgotPass=async(data)=>{
       try{
        const res = await axios.post(`${BASE_URL}/api/auth/forgot-password`, data);
         
       console.log(res)
       if(res.status===200){
        setMessage({open:true,message:"Email sent , please check your mail"})
       }

       }catch(error){
              if(error.response.status===404){
                setMessage({open:true,message:"user not Found , please SignUp"})
              }
              else{
                setMessage({open:true,message:"something went wrong please try again later"})
              }
       }
      }


   
       
  


  return (
    <div className="flex justify-center items-center h-screen bg-[url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')]">
        {
  message.open && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
       
        <p>{message.message}</p>
       <Link to="/"><button className="bg-[#E50914] p-2 rounded-md mt-8 cursor-pointer w-full" >Close</button></Link> 
      </div>
    </div>
  )
}

        <div className="card bg-[rgba(0,0,0,0.7)] w-96 shadow-xl text-white ">
            <div className="card-body">

         
             <h2 className="font-bold text-[2rem] mb-4">Forgot password</h2>
             
             <form noValidate onSubmit={handleSubmit(handleForgotPass)}>
             <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-transparent border p-1.5 rounded-md w-full"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
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

<div>

               <button type="submit"  className="bg-[#E50914] p-2 rounded-md mt-8 cursor-pointer w-full">Send Email</button>
</div>
</form>
    <div className="text-center">
<Link to="/"><u className="cursor-pointer text-center">Sign In / sing Up</u></Link>
</div>
        </div>
    </div>
    </div>
  )
}

export default ForgotPassword