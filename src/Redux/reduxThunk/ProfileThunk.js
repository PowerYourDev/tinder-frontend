import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant";



  export const userProfileUpdate=createAsyncThunk('user/update',async(userupdateData,{rejectWithValue})=>{
    try{
    const response= await axios.patch(`${BASE_URL}/api/profile/edit`,userupdateData,{ withCredentials: true })
    return response.data.data
  }catch(error){
    return rejectWithValue(error);
  }

})


export const getUserProfileData =createAsyncThunk('user/get',async(_,{rejectWithValue})=>{
    try{
    const response= await axios.get(`${BASE_URL}/api/profile/view`,{ withCredentials: true })
    return response.data
  }catch(error){
    console.log(error)
    return rejectWithValue(error);
 
  }

})