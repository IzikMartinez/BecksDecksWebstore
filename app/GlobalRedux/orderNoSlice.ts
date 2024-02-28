import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";

const SAVE_ORDER_NO = 'SAVE_ORDER_NO'
export const savedOrderNo = (orderNo: number) => ({
    type: SAVE_ORDER_NO,
    payload: orderNo,
})

type State = {
    orderNo: number | null
};

type Action = {
    type: string,
    payload: number
}

const initialState: State = {
    orderNo: null
}

export const orderReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SAVE_ORDER_NO:
            return { ...state, orderNo: action.payload}
        default:
            return state
    }
}