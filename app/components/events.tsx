import { FetchEvents } from "../utils/supabase"
import useSWR from "swr"
import Signup from "./fragments/signup"
import { useEffect, useState } from "react"
import { EventType } from "../types/supabase"


export default function EventList() {
    const {data: EVENTS, error, isLoading} = useSWR('supaevents', FetchEvents)
    return (
      (!isLoading && EVENTS !== undefined) 
        ? <div className="fixed flex flex-col justify-center items-center w-full h-full lg:top-24 lg:left-20 left-0 top-16">
            {EVENTS.map((storeEvent: EventType)=>(
                <div key={storeEvent.event_id}>
                    <StoreEvent 
                      game={storeEvent.event_category} 
                      name={storeEvent.event_name} 
                      date={storeEvent.event_time} 
                      fee={storeEvent.event_fee!} 
                      desc={storeEvent.event_description!}/>
                </div>
            ))}
        </div>
        : <div className="fixed flex justify-center items-center text-black">Loading...</div> 
    )
}

interface eventProps {
    game: string | null,
    name: string,
    date: string | null,
    fee: number | null,
    desc: string | null,
}


function StoreEvent(props: eventProps) {
    const [ signupFlag, setSignupFlag ] = useState(false)
    const handleClick = ( )=> {
      setSignupFlag(!signupFlag)
    }
    return(
    <div className="w-[48rem] h-36 flex flex-col items-center justify-center my-5 ">
      <div className="my-0 flex flex-row items-center w-[48rem] h-24 text-black w-128 bg-white rounded-2xl drop-shadow-2xl">
        <div className={`select-none flex text-3xl all-small-caps font-main-display font-bold mr-4 p-2 w-1/6 
              ${props.game ? 'bg-teal-700' : 'bg-red-800'} text-white h-24 justify-center items-center rounded-l-2xl`}>
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
        <div 
          className="h-24 w-1/12 bg-teal-400 hover:bg-orange-500 rounded-r-2xl right-0 absolute cursor-pointer flex justify-center items-center font-semibold"
          onClick={ handleClick}>
        { signupFlag 
          ? <button className="select-none" >
              Submit
            </button>        
          : <button className="select-none" >
              Sign <br /> Up
            </button>
          }
        </div>
      </div>
      <div className="bg-white h-14 relative flex items-center rounded-b-lg">
      { signupFlag ? <Signup name={props.game}></Signup>
        : <span/>
      }
      </div>
    </div>
)}


