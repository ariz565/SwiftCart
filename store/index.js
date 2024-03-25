import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// Removed the import of thunk since it's included in getDefaultMiddleware
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";

const reducers = combineReducers({ cart });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});




export default store;
