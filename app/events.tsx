import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { RootState, store } from "./GlobalRedux/store"
import { BigBubble, Bubble } from "./itemBubbles"
import { supabase } from "./utils/supabase"
// state imports
import { useAppSelector, useAppDispatch } from './hooks'
import { addItem, printItems, removeAllItems, toggleSize } from './GlobalRedux/itemSlice'
import { useEffect } from "react"
import Cart from "./cart"

export function EventProduct() {
  const selector = useAppSelector((state) => state.selection)
    if( store.getState().selection === "products") {
        return <Products />
    }
    else return <Events />
}

type Event = {
    game: string,
    name: string,
    date: string,
    fee: number,
    desc: string,
}

function Events() {
    const events: Event[] = [
        {game: "Magic", name: "Pre-release", date: "10/21", fee: 20, desc:"pretend standard is good at Friday Night Magic"},
        {game: "FaB", name: "Armory", date: "10/21", fee: 10, desc:"Survive 'Ranger Autumn' with your budget CC deck"},
        {game: "Pokemon", name: "Casual", date: "10/20", fee: 10, desc:"Play america's favorite physical NFT game"},
    ]
    return (
        <div className="fixed flex flex-col justify-center items-center w-full h-full top-24 left-20 ">
            {events.map((storeEvent)=>(
                <div key={storeEvent.game}>
                    <StoreEvent game={storeEvent.game} name={storeEvent.name} date={storeEvent.date} fee={storeEvent.fee} desc={storeEvent.desc}></StoreEvent>
                </div>
            ))}
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

function StoreEvent(props: eventProps) {
    return(
        <div className="my-4 flex flex-row items-center w-[48rem] h-24 text-black w-128 bg-white rounded-2xl drop-shadow-2xl">
            <div className="select-none flex text-3xl all-small-caps font-main-display font-bold mr-4 w-1/6 bg-teal-700 text-white h-24 justify-center items-center rounded-l-2xl">
                {props.game}
            </div>
            <div className="ml-3 w-1/6 text-lg font-iosevka font-semibold flex flex-col select-none "> 
                {props.name} <br />
                Date: {props.date} <br />
                Fee: ${props.fee}
            </div>
            <div className="h-24 w-1 bg-gray-800"></div>
            <div className="relative font-texgyre-adventor w-3/6 justify-start left-4 select-none">
                {props.desc}
            </div>
            <div className="h-24 w-1/12 bg-teal-400 hover:bg-orange-500 rounded-r-2xl right-0 absolute  flex justify-center items-center font-semibold">
                <SignUpButton />
            </div>
        </div>
)}

function SignUpButton() {
    return (
    <button className="select-none">
        Sign <br /> Up
    </button>
    )
}





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
                dispatch(addItem({item_ID: "d2az", name: "Fleibo", price: 93, description: "Play the best game better than magic better than universus better than vanguard and yugioh and luigi", size: false, visible: true}))
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
      </div>)}