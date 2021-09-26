import { combineReducers } from "redux";
import { userReducer } from "./User";
import { configureStore } from "@reduxjs/toolkit";

export * from "./User";

export const AppReducer = combineReducers({ user: userReducer });

export const store = configureStore({ reducer: AppReducer });
