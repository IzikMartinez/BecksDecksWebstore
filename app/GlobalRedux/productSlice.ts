import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { supabase } from "../utils/supabase";
import useSWR from 'swr'
import { ProductType } from "../types/supabase";

interface MyAction {
    type: string,
    payload?: any
}

// action creator for getproductByID
const getproductByID = (state = initialState, action: MyAction): ExpandedProduct => {
    switch(action.type){
        case 'GET_product_BY_ID':
            const index = action.payload
            const value = state.products[index];
            return value 
        default:
            return state.products[0]
    }
}

export const selectAllProducts = (state: RootState) => {
    return state.productStore.products
}

const toggleNonactiveOff = (state = initialState, action: MyAction): void => {
    const activeIndex = action.payload
    const nonactiveproducts = state.products.filter(product => product.product_id !== activeIndex)
    switch(action.type) {
        case 'TOGGLE_NONACTIVE_OFF':
            console.log("TOGGLE_OFF: CALLED")
            nonactiveproducts.forEach(product => product.visible = !product.visible)
            break;
        case 'TOGGLE_NONACTIVE_ON':
            console.log("TOGGLE_ALL: CALLED")
            nonactiveproducts.forEach(product => product.visible = true)
            break;
    }
}


export type ExpandedProduct = {
    product_category: string | null,
    product_desc: string | null,
    product_id: string,
    in_stock: number | null,
    product_name: string,
    product_price: number | null,
    size: boolean
    visible: boolean
}

interface InitialInventoryState {
    products: ExpandedProduct[]
}



const initialState: InitialInventoryState = {
    products: []
}


export const productSlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        ConvertToExpandedProducts: (state, data: PayloadAction<ProductType[]>) => {
                let expandedProducts: ExpandedProduct[] = []
                data.payload.forEach(item =>  expandedProducts.push({
                        product_category: item.category,
                        product_desc: item.desc,
                        product_id: item.id,
                        in_stock: item.in_stock,
                        product_name: item.name,
                        product_price: item.price,
                        size: false,
                        visible: true
                }))
                console.log("Retrieved in store: ", expandedProducts);
                state.products = expandedProducts
        },
        addproduct: (state, action: PayloadAction<ExpandedProduct>) => {
            state.products.push(action.payload)
        },
        removeproduct: (state, action: PayloadAction<ExpandedProduct>) => {
            state.products.filter(x => x.product_id != action.payload.product_id)
        },
        removeAllproducts: (state) => {
            state.products = []
        },
        printproducts: (state) => {
            console.log(state.products);
        },
        toggleSize: (state, action: PayloadAction<string>) => {
            const inputProductID= action.payload
            const index = state.products.find((product) => product.product_id === inputProductID)

            // toggle other elements
            if(index) {
                index.size = !index.size
                toggleNonactiveOff(state, { type: 'TOGGLE_NONACTIVE_OFF', payload: action.payload })
            }
        },
    }
})

export const { addproduct, removeproduct, removeAllproducts, printproducts, toggleSize, ConvertToExpandedProducts } = productSlice.actions
//export const selectBubble = (state: RootState) => state.bubble.value
export default productSlice.reducer