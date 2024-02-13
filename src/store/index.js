// store.js

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loadState, saveState } from "../components/Utility/LocalStorage";
import userReducers from "./reducers/userReducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  root: userReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const preloadedState = loadState();

const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  middleware: [thunk],
});

store.subscribe(() => {
  saveState(store.getState());
});

export const persistor = persistStore(store);

export default store;
