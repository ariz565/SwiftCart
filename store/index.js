import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";
import expandSidebar from "./ExpandSlice";
import dialog from "./DialogSlice";
import showMobileCate from "./mobileCateSlice";
import userSlice from "./userSlice";

const reducers = combineReducers({
  cart,
  expandSidebar,
  dialog,
  userSlice,
  showMobileCate,
});

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

export default store;
