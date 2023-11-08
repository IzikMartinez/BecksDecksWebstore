'use client';

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const getCategorySelection = (state: RootState) => {
    return state.selection.category
}
interface initialCategoryState {
  category: string
}

const initialState: initialCategoryState = { category: "products" }
const selectionSlice = createSlice({
    name: "selection",
    initialState,
    reducers: {
        setCategorySelection: (state, action: PayloadAction<string>) => {
            state.category=action.payload
        },
    }
  })

export const { setCategorySelection} = selectionSlice.actions;
export default selectionSlice.reducer;
