import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const feedData=createAsyncThunk('feed',async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get('http://localhost:5000/api/users/feed',{withCredentials:true})
        console.log(response,"jidfyhuop")
        return response.data.data
        
    } catch (error) {
        rejectWithValue(error) 
    }

})


export const sendFriendRequest=createAsyncThunk('send/feed',async({status,_id},{rejectWithValue})=>{
    try {
        const response=await axios.post(`http://localhost:5000/api/request/send/${status}/${_id}`,{},{withCredentials:true})
        console.log(response.data,"rammm")
   
        return response.data
        
    } catch (error) {
        rejectWithValue(error) 
    }

})