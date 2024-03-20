import { useAppSelector} from './hooks'
import { ProductList } from "./components/products"
import { getCategorySelection } from "./GlobalRedux/selectionSlice"
import EventList from "./components/events"
import {Calendar} from "@/app/components/calendar";

export function EventProduct() {
  const selectedCategory = useAppSelector(getCategorySelection)
    if( selectedCategory === "products") {
        return <ProductList />
    }
    else return <Calendar/>
}


