import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { shazamApi } from "./services/sazhamCore";
export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(shazamApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
