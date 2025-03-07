import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSignin = createAsyncThunk(
    'auth/signin', 
    async (userCredentials, { rejectWithValue }) => {
      try {
  
        const response = await axios.post(
          'http://localhost:5000/api/auth/singin',
          {email:userCredentials.email,password:userCredentials.password},
          { withCredentials: true }
        );
  
   
        return response;
      } catch (error) {
         console.log(error)
        return rejectWithValue(error);
      }
    }
  );


  export const userSingUp=createAsyncThunk('user/singup',async(formData,{rejectWithValue})=>{
    try{
       const response = await axios.post('http://localhost:5000/api/auth/singup',formData,{withCredentials:true})
       return response
    }catch(error){
      console.log(error)
      return rejectWithValue(error);

    }
  })

  export const userLogOut=createAsyncThunk('auth/logout',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.post('http://localhost:5000/api/auth/logout',{}, { withCredentials: true })
        return response.data
    }catch( error){
        return rejectWithValue(error);
    }

  })

