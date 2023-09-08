import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Item {
    item_ID: string,
    name: string,
    price: number,
    description: string,
    size: boolean
}

interface InventoryState {
    items: Item[]
}

const initialState: InventoryState = {
    items: []
}

export const itemSlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload)
        },
        toggleSize: (state, action: PayloadAction<string>) => {
            const itemID = action.payload
            const index = state.items.find((item) => item.item_ID === itemID)
            if(index) {
                index.size = !index.size
            }
        }
    }
})

export const { addItem, toggleSize } = itemSlice.actions
//export const selectBubble = (state: RootState) => state.bubble.value
export default itemSlice.reducer