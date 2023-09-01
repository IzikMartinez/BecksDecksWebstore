"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "./selectionSlice"
import bubbleReducer from "./bubbleSlice";

export const store = configureStore({
    reducer: {
        selection: selectionReducer,
        bubble: bubbleReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch