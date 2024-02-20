import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {state} from "sucrase/dist/types/parser/traverser/base";

export interface cartItem {
    id: string,
    name: string,
    price: number,
    quantity: number
}

interface cartItems {
    visible: boolean,
    cartItems: cartItem[]
}

const initialState: cartItems = {
    visible: false,
    cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
        const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
        if(itemIndex === -1) {
          state.cartItems.push(action.payload)
        } else state.cartItems.find(item => item.id === action.payload.id)!.quantity! += 1
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
    },
    setQuantity: (state, action: PayloadAction<{ itemID: string, quantity: number }>) => {
      const { itemID, quantity } = action.payload
      const activeItem = state.cartItems.find(item => item.id === itemID)
      if(activeItem) activeItem.quantity = quantity
    },
    toggleVisible: (state, action: PayloadAction<boolean>) => {
      console.log("Cart state ", state.visible);
      state.visible = action.payload
    },
    clearCart: (state) => {
    state.cartItems = [];
    }
  },
})


export const selectTotalCartQuantity= (state: RootState) => { 
  let count = 0
  state.cartItems.cartItems.forEach((item: { quantity: number; }) => count += item.quantity)
  return count
}

export const selectTotalCartPrice = (state:RootState) => {
  let count = 0
  state.cartItems.cartItems.forEach((item: { price: number; quantity: number; }) => count += item.price * item.quantity)
  return count
}

export const selectVisibleFlag = (state: RootState) => {
  return state.cartItems.visible
}

const getQuantityFilter = (state:RootState, itemID: string) => itemID 
export const selectQuantity = createSelector (
  [(state: RootState) => state.cartItems.cartItems, getQuantityFilter],
  (cartItems, itemID) => 
    cartItems.find((item: { id: any; }) => item.id === itemID)?.quantity
)


export const { addToCart, removeFromCart, toggleVisible, setQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
