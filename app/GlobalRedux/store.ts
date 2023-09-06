"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "./selectionSlice"
import itemReducer from "./itemSlice";

export const store = configureStore({
    reducer: {
        selection: selectionReducer,
        item: itemReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch