"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "./selectionSlice"
import productItemReducer from "./productSlice";
import sidebarReducer from "./sidebarSlice"
import cartReducer from "./cartSlice"

export const store = configureStore({
    reducer: {
        selection: selectionReducer,
        productStore: productItemReducer,
        sidebar: sidebarReducer,
        cartItems: cartReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch