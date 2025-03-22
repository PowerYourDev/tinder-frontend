import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";


import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import userSlice from "./sliceReducer/userSlice"
import FeedSlice from "./sliceReducer/FeedSlice"
import ProfileSlice from "./sliceReducer/ProfileSlice"
import connectionsSlice from "./sliceReducer/connectionsSlice"






const reducer = combineReducers({
    userSlice: userSlice,
    FeedSlice:FeedSlice,
    ProfileSlice:ProfileSlice,
    connectionsSlice:connectionsSlice
  
  });

   const rootReducer = (state, action) => {
    if (action.type === "RESET_STATE") {
      // Reset the state to initial values
      state = undefined; // This will reset the state to its initial state
    }
    return reducer(state, action);
  };


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
  });

export default store