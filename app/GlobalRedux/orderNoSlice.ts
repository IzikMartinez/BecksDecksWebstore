import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";

function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
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
        setOrderNumber: (state, action: PayloadAction<number>) => {
            state.orderNumber = action.payload
        },
    },
});

//Adding getter
export const getOrderNumber = (state: RootState) => state.orderNo.orderNumber
export const { setOrderNumber } = orderNumberSlice.actions;

export default orderNumberSlice.reducer;