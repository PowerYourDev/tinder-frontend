import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userSignin = createAsyncThunk(
  'user/signin', 
  async (userCredentials, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        'http://localhost:5000/api/auth/singin',
        userCredentials,
        { withCredentials: true }
      );

 
      return response.data;
    } catch (error) {
   
      return rejectWithValue(error.message);
    }
  }
);

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
      });
  },
});


export default userSlice.reducer;
