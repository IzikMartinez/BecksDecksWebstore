import { useAppSelector} from './hooks'
import { ProductList } from "./components/products"
import { getCategorySelection } from "./GlobalRedux/selectionSlice"
import EventList from "./components/events"

export function EventProduct() {
  const selectedCategory = useAppSelector(getCategorySelection)
    if( selectedCategory === "products") {
        return <ProductList />
    }
    else return <EventList />
}


