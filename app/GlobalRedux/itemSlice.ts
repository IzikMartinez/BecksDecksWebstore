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
    items: [{
        item_ID: "tade8",
        name: "Spongeboy",
        price: 150,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident harum perspiciatis quasi deserunt ut repudiandae dolor, repellat est magnam hic facere cumque quisquam assumenda officiis magni aliquid temporibus amet eos.",
        size: false
    }]
}

interface MyAction {
    type: string,
    payload?: any
}

// action creator for getItemByID
const getItemByID = (state = initialState, action: MyAction): Item => {
    switch(action.type){
        case 'GET_ITEM_BY_ID':
            const index = action.payload
            const value = state.items[index];
            return value 
        default:
            return state.items[0]
    }
}

/*
export const toggleSize = (itemID: string): PayloadAction<string> => {
    return{
        type: 'TOGGLE_SIZE',
        payload: itemID
    }
}
*/

export const itemSlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload)
        },
        toggleSize: (state, action: PayloadAction<string>) => {
            const inputItemID= action.payload
            const index = state.items.find((item) => item.item_ID === inputItemID)
            if(index) {
                index.size = !index.size
            }
        },
    }
})

export const { addItem, toggleSize } = itemSlice.actions
//export const selectBubble = (state: RootState) => state.bubble.value
export default itemSlice.reducer