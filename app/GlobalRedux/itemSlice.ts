import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ItemState{
    name: string,
    price: number,
    description: string,
    size: boolean
}

const initialState: ItemState = {
    name: "N/A",
    price: 1000,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed malesuada nisi. Sed molestie orci a condimentum pellentesque. Morbi efficitur vel tortor sed vehicula. Maecenas vel tellus vulputate, convallis massa sed, ultrices felis. Curabitur tortor lectus, dignissim gravida semper a, fringilla non orci. Morbi ornare mattis tincidunt. Donec at vestibulum sem. Nullam tincidunt venenatis purus non pretium. Aliquam mi nisi, pharetra sed tortor sit amet, placerat convallis elit. Fusce blandit tincidunt diam, ac luctus erat.",
    size: false
}

export const itemSlice = createSlice({
    name: 'bubble',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload
        },
        setDesc: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        toggleSize: (state) => {
            state.size = !state.size
        }
    }
})

export const { setName, setPrice, setDesc, toggleSize } = itemSlice.actions
//export const selectBubble = (state: RootState) => state.bubble.value
export default itemSlice.reducer