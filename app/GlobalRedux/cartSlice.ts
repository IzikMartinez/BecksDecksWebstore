import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartItem {
    name: string,
    price: number,
    quantity: number
}

interface cartItems {
    cartItems: cartItem[]
}

const initialState: cartItems = {
    cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
        const itemIndex = state.cartItems.findIndex(item => item.name === action.payload.name)
        if(itemIndex === -1) {
          state.cartItems.push(action.payload)
        }
        state.cartItems.find(item => item.name === action.payload.name)!.quantity! += 1
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
        const itemIndex = state.cartItems.findIndex(item => item.name === action.payload)
        if(itemIndex != -1) {
          if(state.cartItems.at(itemIndex)?.quantity! > 1) {
            state.cartItems.at(itemIndex)!.quantity -= 1
          }
          state.cartItems.filter(item => item.name === action.payload)
      }
    }
  }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
