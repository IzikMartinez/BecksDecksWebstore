import styles from "app/styles/home.module.css"
import { AppDispatch, RootState } from "./GlobalRedux/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import Image from 'next/image'
import { useAppSelector } from "./hooks"
import { useRouter } from "next/router"
import Link from "next/link"
import { setSelection } from "./GlobalRedux/selectionSlice"
import { useEffect, useRef, useState } from "react"
import Cart from "./cart"
import {selectTotalCartQuantity, selectVisibleFlag, toggleVisible } from "./GlobalRedux/cartSlice"

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
  <BarIcon path="cart.svg" width={380} height={280}></BarIcon>
  </span>
  )
}

function ProdEvent(props: ProdEventProps) {
    const dispatch = useAppDispatch()
    return(
        <div className="flex relative mx-4 p-3 h-16 w-24 text-3xl font-iosevka font-bold small-caps hover:text-blue-400
             cursor-pointer select-none self-center text-center justify-center items-center" onClick={() => {dispatch(setSelection(props.name))}}>
            {props.name}
        </div>
    )
}

function BarIcon(props: IconProps) {
  const dispatch = useAppDispatch()
  const cartVisible = useAppSelector(selectVisibleFlag)
  return (
    <div className="fixed flex w-1/2 h-24 top-0 right-0 bg-green-400 justify-center">
      <div>
        <div className="bg-pink-500 w-20 h-12 top-8 flex items-center justify-center cursor-pointer" onClick={()=> dispatch(toggleVisible(!cartVisible))}>
          <Image src={props.path} alt='hold' width={props.width} height={props.height} />
          {cartVisible ? <span></span>:  
          <CartQuantity />
          }
        </div>
      </div>
        {/* { cartToggle ? 
        <Cart /> :
        <span></span>
        } */}
      </div>
  )}

  function CartQuantity() {
    const cartQuantity = useAppSelector(selectTotalCartQuantity)
    return (
      <div>
      { (cartQuantity > 0) ?
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="w-5 h-5 text-xs font-semibold text-white p-1 bg-gray-700 rounded-3xl">{cartQuantity}</p>
      </div>
      : <div></div> }
    </div>
    )
    
  }



