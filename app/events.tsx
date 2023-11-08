import { store } from "./GlobalRedux/store"
import { FetchEvents, supabase } from "./utils/supabase"
// state imports
import { useAppSelector, useAppDispatch } from './hooks'
import { ProductList } from "./components/products"
import useSWR from "swr"
import Signup from "./components/fragments/signup"
import { getCategorySelection } from "./GlobalRedux/selectionSlice"

export function EventProduct() {
  const selectedCategory = useAppSelector(getCategorySelection)
    if( selectedCategory === "products") {
        return <ProductList />
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
        {game: "magic.png", name: "Pre-release", date: "10/21", fee: 20, desc:"What do you mean I can't use my Commander deck at pre-release?"},
        {game: "fab.png", name: "Armory", date: "10/21", fee: 10, desc:"Survive 'Ranger Autumn' with your budget CC deck"},
        {game: "pokemon.png", name: "Casual", date: "10/20", fee: 10, desc:"Play america's favorite physical NFT game"},
        {game: "yugioh.svg", name: "Weekly", date: "10/23", fee: 10, desc:"Can you believe Pot of Greed is legal online?"},
    ]
    const {data: EVENTS, error, isLoading} = useSWR('supaevents', FetchEvents)
    return (
      isLoading ? <div className="fixed flex justify-center items-center text-black">Loading...</div> :
        <div className="fixed flex flex-col justify-center items-center w-full h-full lg:top-24 lg:left-20 left-0 top-16">
            {EVENTS!.map((storeEvent)=>(
                <div key={storeEvent.event_id}>
                    <StoreEvent game={storeEvent.event_category} name={storeEvent.event_name} date={storeEvent.event_time} fee={storeEvent.event_fee!} desc={storeEvent.event_description!}></StoreEvent>
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
        <div className="w-[48rem] h-36 flex flex-col items-center justify-center my-5 ">
        <div className="my-0 flex flex-row items-center w-[48rem] h-24 text-black w-128 bg-white rounded-2xl drop-shadow-2xl">
            <div className={"select-none flex text-3xl all-small-caps font-main-display font-bold mr-4 p-2 w-1/6 ${props.game ? 'bg-teal-700' : 'bg-red-800'} text-white h-24 justify-center items-center rounded-l-2xl"}>
                <img src={props.game + ".png"} height={200} width={200} />
            </div>
            <div className="ml-2 mr-3 w-2/7 text-lg font-iosevka font-semibold flex flex-col select-none "> 
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
            <div className="bg-white h-14 relative flex items-center rounded-b-lg">
                <Signup name={props.game}></Signup>
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

