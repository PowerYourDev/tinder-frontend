import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";


import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import userSlice from "./sliceReducer/userSlice"
import FeedSlice from "./sliceReducer/FeedSlice"
import ProfileSlice from "./sliceReducer/ProfileSlice"






const reducer = combineReducers({
    userSlice: userSlice,
    FeedSlice:FeedSlice,
    ProfileSlice:ProfileSlice
  
  });


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    
  };
  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = configureStore({
    reducer: persistedReducer,
  });

export default store