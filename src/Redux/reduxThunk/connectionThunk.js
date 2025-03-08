import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant";


export const connectionsApi = createAsyncThunk('user/connections',async(_,{rejectWithValue})=>{
    try {
        const response =await axios.get(`${BASE_URL}/api/users/requests/connections`,{withCredentials:true})
        
        return response.data.data
        
    } catch (error) {
        rejectWithValue(error)
        
    }
})


export const connectionsRequestApi = createAsyncThunk('user/connectionsRequest',async(_,{rejectWithValue})=>{
    try {
        const response =await axios.get(`${BASE_URL}/api/users/requests/received`,{withCredentials:true})
        
        return response.data.data
        
    } catch (error) {
        rejectWithValue(error)
        
    }
})


export const connectionsRequestReviewApi = createAsyncThunk('user/reviewRequest',async({ status, _id },{rejectWithValue})=>{
    try {
        const response =await axios.post(`${BASE_URL}/api/request/review/${status}/${_id}`,{},{withCredentials:true})
        console.log(response,"hello")
        return response.data.data


        
    } catch (error) {
        console.log(error,"hello")
        rejectWithValue(error)
        
    }
})






