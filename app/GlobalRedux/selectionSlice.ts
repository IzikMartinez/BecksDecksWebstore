'use client';

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "products"

const selectionSlice = createSlice({
    name: "selection",
    initialState,
    reducers: {
        setSelection: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    }
})

export const { setSelection } = selectionSlice.actions;
export default selectionSlice.reducer;