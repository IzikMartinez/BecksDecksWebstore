import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";

function generateOrderNumber() {
    return Date.now() + Math.floor((Math.random() * 100000))
}
interface orderState {
    orderNumber: number
}

const initialState: orderState = {
    orderNumber: generateOrderNumber()
}

const orderNumberSlice = createSlice({
    name: 'orderNumber',
    initialState,
    reducers: {
        setOrderNumber: (state) => {
            state.orderNumber = generateOrderNumber()
        },
    },
});

//Adding getter
export const getOrderNumber = (state: RootState) => {
    return state.orderNo.orderNumber
}
export const { setOrderNumber } = orderNumberSlice.actions;

export default orderNumberSlice.reducer;