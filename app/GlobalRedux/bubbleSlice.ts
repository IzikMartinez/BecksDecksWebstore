import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BubbleState {
    value: boolean
}

const initialState: BubbleState = {
    value: false
}

export const bubbleSlice = createSlice({
    name: 'bubble',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value
        }
    }
})

export const { toggle } = bubbleSlice.actions
export const selectBubble = (state: RootState) => state.bubble.value
export default bubbleSlice.reducer