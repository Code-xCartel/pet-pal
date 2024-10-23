import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/auth/loginReducer";
import RegisterReducer from "./reducers/auth/registerReducer";

const authReducer = combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
