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
        state.cartItems.push(action.payload)
    }
  }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
