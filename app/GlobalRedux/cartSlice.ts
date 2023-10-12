import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Root } from "postcss";

interface cartItem {
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
        const itemIndex = state.cartItems.findIndex(item => item.id === action.payload)
        if(itemIndex !== -1) {
          if(state.cartItems.at(itemIndex)?.quantity! > 1) {
            state.cartItems.at(itemIndex)!.quantity -= 1
          }
          else state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
      }
    },
    toggleVisible: (state, action: PayloadAction<boolean>) => {
      console.log("Cart state ", state.visible);
      state.visible = action.payload
    },
  },
})


export const selectTotalCartQuantity= (state: RootState) => { 
  let count = 0
  state.cartItems.cartItems.forEach(item => count += item.quantity) 
  return count
}

export const selectTotalCartPrice = (state:RootState) => {
  let count = 0
  state.cartItems.cartItems.forEach(item => count += item.price * item.quantity)
  return count
}

export const selectVisibleFlag = (state: RootState) => {
  return state.cartItems.visible
}

const getQuantityFilter = (state:RootState, itemID: string) => itemID 
export const selectQuantity = createSelector (
  [(state: RootState) => state.cartItems.cartItems, getQuantityFilter],
  (cartItems, itemID) => 
    cartItems.find(item => item.id === itemID)?.quantity
)

export const { addToCart, removeFromCart, toggleVisible } = cartSlice.actions
export default cartSlice.reducer
