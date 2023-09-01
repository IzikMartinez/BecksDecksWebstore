import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState, store } from "./GlobalRedux/store"
import { Bubble } from "./itemBubbles"
import { supabase } from "./utils/supabase"
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

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
    return (
      <div className='fixed flex flex-wrap flex-grow left-24 top-8 h-screen items-center justify-center'>
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="Sponge" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="Bob" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="Lookin" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="like" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="a snack" itemPrice={100.00} description='lorem ipso factum'></Bubble>     
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="sponge" itemPrice={100.00} description='lorem ipso factum'></Bubble>
      </div>
    )
}