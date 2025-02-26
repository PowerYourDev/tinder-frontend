
import { createSlice } from '@reduxjs/toolkit';
import {userSignin,userLogOut} from "../reduxThunk/userThunk"



// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(userSignin.pending, (state) => {
        state.loading = true;
      })

      .addCase(userSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
     
      .addCase(userSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userLogOut.pending, (state) => {
        state.loading = true;
      })

      .addCase(userLogOut.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.error = null;
      })
     
      .addCase(userLogOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});


export default userSlice.reducer;
