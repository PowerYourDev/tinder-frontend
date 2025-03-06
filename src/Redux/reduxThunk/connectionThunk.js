import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const connections = createAsyncThunk('user/connections',async(_,rejectWithValue)=>{
    try {
        const response =await axios.get("http://localhost:5000/api/users/requests/connections",{withCredentials:true})
        
        return response.data.data
        
    } catch (error) {
        rejectWithValue(error)
        
    }
})






export default connections