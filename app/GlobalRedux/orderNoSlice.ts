import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderNumberState = number;

const initialState: OrderNumberState = 0;

const orderNumberSlice = createSlice({
    name: 'orderNumber',
    initialState,
    reducers: {
        setOrderNumber: (state, action: PayloadAction<OrderNumberState>) => action.payload,
        getOrderNumber: (state) => state,
    },
});

export const { setOrderNumber, getOrderNumber } = orderNumberSlice.actions;

export default orderNumberSlice.reducer;