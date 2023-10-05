'use client';

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState: string = "Magic"

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebarSelection: (state, action: PayloadAction<string>) => {
            state = action.payload
            return state;
        }
    }
})

export const { setSidebarSelection } = sidebarSlice.actions;
export default sidebarSlice.reducer;