import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



  export const userProfileUpdate=createAsyncThunk('user/update',async(userupdateData,{rejectWithValue})=>{
    try{
    const response= await axios.patch('http://localhost:5000/api/profile/edit',userupdateData,{ withCredentials: true })
    return response.data.data
  }catch(error){
    return rejectWithValue(error);
  }

})


export const getUserProfileData =createAsyncThunk('user/get',async(_,{rejectWithValue})=>{
    try{
    const response= await axios.get('http://localhost:5000/api/profile/view',{ withCredentials: true })
    return response.data
  }catch(error){
    console.log(error)
    return rejectWithValue(error);
 
  }

})