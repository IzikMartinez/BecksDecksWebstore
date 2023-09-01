import styles from "app/styles/home.module.css"
import { AppDispatch, RootState } from "./GlobalRedux/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { Providers } from "./GlobalRedux/provider"

import Image from 'next/image'
import selectionSlice, { setSelection } from "./GlobalRedux/selectionSlice"

interface IconProps {
  path: string,
  width: number,
  height: number
}

interface ProdEventProps {
    name: string
}

export const useAppDispatch: () => AppDispatch = useDispatch

export function Splash() {
  return (
  <span className='flex flex-row fixed w-screen h-24 top-0 left-0 bg-gradient-to-r from-pastel-coral via-pastel-yellow to-yellow-compliment text-black  shadow-xl shadow-blue-gray-800 text-center items-center justify-center'> 
    <div className="flex fixed flex-row w-full">
        <ProdEvent name="events" />
        <ProdEvent name="products" />
    </div>
    <div className={styles.title}>
      SPARKLING CITY LGS
    </div>
  <BarIcon path="cart.svg" width={180} height={180}></BarIcon>
  </span>
  )
}

function ProdEvent(props: ProdEventProps) {
    const dispatch = useAppDispatch()
    return(
        <div className="flex relative mx-4 p-3 h-16 w-24 text-3xl font-iosevka font-bold small-caps hover:text-blue-400
             cursor-pointer select-none self-center text-center justify-center items-center" onClick={() => {return dispatch(setSelection(props.name))}}>
            {props.name}
        </div>
    )
}

function BarIcon(props: IconProps) {
  return (
    <div className='w-20 h-20 rounded-lg mr-6'>
      <Image src={props.path} alt='hold' width={props.width} height={props.height} />
    </div>
  )}

  function clickHandler(name: string) {
        setSelection(name)
  }

