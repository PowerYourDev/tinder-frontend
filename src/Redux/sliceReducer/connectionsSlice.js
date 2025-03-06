import { createSlice } from "@reduxjs/toolkit";
import {connectionsApi,connectionsRequestApi,connectionsRequestReviewApi} from "../reduxThunk/connectionThunk"


const connectionns= createSlice({
    name:"connections",
    initialState:{
        connections:null,
        connectionRequests:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder) => {
             builder
             .addCase(connectionsApi.pending, (state) => {
                 state.loading = true;
               })
         
               .addCase(connectionsApi.fulfilled, (state, action) => {
                 state.loading = false;
                 state.connections = action.payload;
                 state.error = null;
               })
              
               .addCase(connectionsApi.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.payload;
               })


               .addCase(connectionsRequestApi.pending, (state) => {
                state.loading = true;
              })
        
              .addCase(connectionsRequestApi.fulfilled, (state, action) => {
                state.loading = false;
                state.connectionRequests = action.payload;
                state.error = null;
              })
             
              .addCase(connectionsRequestApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })


              .addCase(connectionsRequestReviewApi.pending, (state) => {
                state.loading = true;
              })
        
              .addCase(connectionsRequestReviewApi.fulfilled, (state, action) => {
                state.loading = false;
                state.connectionRequests = state.connectionRequests.filter((request)=> request._id !== action.payload._id);
                state.error = null;
              })
             
              .addCase(connectionsRequestReviewApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
         
               
         
           },

    
})




export default connectionns.reducer