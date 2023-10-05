import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { RootState, store } from "./GlobalRedux/store"
import { BigBubble, Bubble } from "./itemBubbles"
import { supabase } from "./utils/supabase"
// state imports
import { useAppSelector, useAppDispatch } from './hooks'
import { addItem, printItems, removeAllItems, toggleSize } from './GlobalRedux/itemSlice'
import { useEffect } from "react"

export function EventProduct() {
  const selector = useAppSelector((state) => state.selection)
    if( store.getState().selection === "products") {
        return <Products />
    }
    return <Events />
}

function Events() {
    return (
        <div className="fixed flex flex-col first-letter:justify-center items-center w-screen bg-pink-400">
        </div>
    )
}

interface eventProps {
    game: string,
    name: string,
    date: string,
    fee: number,
    desc: string,
}

interface Item {
    item_ID: string,
    name: string,
    price: number,
    description: string,
    size: boolean
}

function Event(props: eventProps) {
    return(
        <div className="text-black w-128 bg-slate-500">
            {props.game} <br />
            {props.name} <br />
            {props.date} <br />
            {props.fee}  <br />
            {props.desc}
        </div>
)}



function Products() {
    const inventory = useAppSelector(state => state.item)
    const selectedSidebar = useAppSelector(state => state.sidebar)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(removeAllItems())
        if(selectedSidebar === "Magic")
            {
                dispatch(addItem({item_ID: "deas", name: "Chon", price: 40, description: "Karate Bruce Lee Jet Lee Jackie Chan", size: false, visible: true}))
            }
        else if(selectedSidebar === "Flesh and Blood")
            {
                dispatch(addItem({item_ID: "d3as", name: "Fleibo", price: 90, description: "Play the best game better than magic better than universus better than vanguard and yugioh and luigi", size: false, visible: true}))
            }
        /*
        dispatch(addItem({item_ID: "rde8", name: "Wang", price: 80, description: "Karate", size: false}))
        */
    return () => {
    }}, [dispatch, selectedSidebar])
    return (
      <div className='fixed flex flex-wrap flex-grow left-16 top-24 h-screen w-screen items-center justify-center '>
        {inventory.items.map((item) => (
            <div key = {item.item_ID}>
                <Bubble itemID={item.item_ID} itemName={item.name} itemPrice={item.price} description={item.description} imgPath="placeholder.jpg" />
            </div>
        ))}
      </div>
    )
}