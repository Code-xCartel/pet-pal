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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          "payload.config",
          "payload.headers",
          "payload.request",
          "meta.arg",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
