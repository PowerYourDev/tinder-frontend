import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSignin = createAsyncThunk(
    'auth/signin', 
    async (userCredentials, { rejectWithValue }) => {
      try {
  
        const response = await axios.post(
          'http://localhost:5000/api/auth/singin',
          userCredentials,
          { withCredentials: true }
        );
  
   
        return response.data;
      } catch (error) {
         console.log(error)
        return rejectWithValue(error);
      }
    }
  );


  export const userLogOut=createAsyncThunk('auth/logout',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.post('http://localhost:5000/api/auth/logout',{}, { withCredentials: true })
        return response.data
    }catch( error){
        return rejectWithValue(error);
    }

  })