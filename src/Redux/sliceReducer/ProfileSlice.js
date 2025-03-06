
import { createSlice } from '@reduxjs/toolkit';
import {userProfileUpdate,getUserProfileData} from "../reduxThunk/ProfileThunk"



// Create the slice
const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUserProfileData.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUserProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
     
      .addCase(getUserProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
      .addCase(userProfileUpdate.pending, (state) => {
        state.loading = true;
      })

      .addCase(userProfileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
     
      .addCase(userProfileUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});


export default ProfileSlice.reducer;
