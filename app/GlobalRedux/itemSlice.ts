import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Item {
    item_ID: string,
    name: string,
    price: number,
    description: string,
    size: boolean
    visible: boolean
}

interface InventoryState {
    items: Item[]
}

const initialState: InventoryState = {
    items: [
        {
        item_ID: "tade8",
        name: "Spongeboy",
        price: 150,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident harum perspiciatis quasi deserunt ut repudiandae dolor, repellat est magnam hic facere cumque quisquam assumenda officiis magni aliquid temporibus amet eos.",
        size: false,
        visible: true 
    },
        {
        item_ID: "infa3",
        name: "Bebob",
        price: 100,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident harum perspiciatis quasi deserunt ut repudiandae dolor, repellat est magnam hic facere cumque quisquam assumenda officiis magni aliquid temporibus amet eos.",
        size: false,
        visible: true 
    },
]
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

const toggleNonactiveOff = (state = initialState, action: MyAction): void => {
    const activeIndex = action.payload
    const nonactiveItems = state.items.filter(item => item.item_ID !== activeIndex)
    switch(action.type) {
        case 'TOGGLE_NONACTIVE_OFF':
            console.log("TOGGLE_OFF: CALLED")
            nonactiveItems.forEach(item => item.visible = !item.visible)
            break;
        case 'TOGGLE_NONACTIVE_ON':
            console.log("TOGGLE_ALL: CALLED")
            nonactiveItems.forEach(item => item.visible = true)
            break;
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
        removeItem: (state, action: PayloadAction<Item>) => {
            state.items.filter(x => x.item_ID != action.payload.item_ID)
        },
        removeAllItems: (state) => {
            state.items = []
        },
        printItems: (state) => {
            console.log(state.items);
        },
        toggleSize: (state, action: PayloadAction<string>) => {
            const inputItemID= action.payload
            const index = state.items.find((item) => item.item_ID === inputItemID)

            // toggle other elements
            if(index) {
                index.size = !index.size
                toggleNonactiveOff(state, { type: 'TOGGLE_NONACTIVE_OFF', payload: action.payload })
            }
        },
    }
})

export const { addItem, removeItem, removeAllItems, printItems, toggleSize } = itemSlice.actions
//export const selectBubble = (state: RootState) => state.bubble.value
export default itemSlice.reducer