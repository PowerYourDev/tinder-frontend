import { createSlice } from "@reduxjs/toolkit";
import { feedData,sendFriendRequest } from "../reduxThunk/feedThunk";

const FeedSlice=createSlice({
    name:"feed",
    initialState: {
        data: [],
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

            .addCase(sendFriendRequest.pending, (state) => {
              state.loading = true;
            })
      
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
              state.loading = false;
              state.data = state.data.filter((request)=> request._id !== action.payload.data.toUserId);
              state.error = null;
            })
           
            .addCase(sendFriendRequest.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
      
            
      
        },

})

export default FeedSlice.reducer