import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utilis/constant";


export const feedData=createAsyncThunk('feed',async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get(`${BASE_URL}/api/users/feed`,{withCredentials:true})
        console.log(response,"jidfyhuop")
        return response.data.data
        
    } catch (error) {
        rejectWithValue(error) 
    }

})


export const sendFriendRequest=createAsyncThunk('send/feed',async({status,_id},{rejectWithValue})=>{
    try {
        const response=await axios.post(`${BASE_URL}/api/request/send/${status}/${_id}`,{},{withCredentials:true})
        console.log(response.data,"rammm")
   
        return response.data
        
    } catch (error) {
        rejectWithValue(error) 
    }

})