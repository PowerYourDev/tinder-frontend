import { createSlice } from "@reduxjs/toolkit";
import connections from "../reduxThunk/connectionThunk"


const connectionns= createSlice({
    name:"connections",
    initialState:{
        data:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder) => {
             builder
             .addCase(connections.pending, (state) => {
                 state.loading = true;
               })
         
               .addCase(connections.fulfilled, (state, action) => {
                 state.loading = false;
                 state.data = action.payload;
                 state.error = null;
               })
              
               .addCase(connections.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.payload;
               })
         
               
         
           },

    
})




export default connectionns.reducer