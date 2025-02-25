import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";


import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import userSlice from "./sliceReducer/userSlice"







const reducer = combineReducers({
    userSlice: userSlice,
  
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