import { createSlice } from "@reduxjs/toolkit";
import { feedData } from "../reduxThunk/feedThunk";

const FeedSlice=createSlice({
    name:"feed",
    initialState: {
        data: null,
        loading: false,
        error: null,
      },
      reducers:{},
      extraReducers: (builder) => {
          builder
          .addCase(feedData.pending, (state) => {
              state.loading = true;
            })
      
            .addCase(feedData.fulfilled, (state, action) => {
              state.loading = false;
              state.data = action.payload;
              state.error = null;
            })
           
            .addCase(feedData.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
      
            
      
        },

})

export default FeedSlice.reducer