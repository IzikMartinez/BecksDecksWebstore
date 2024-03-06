import styles from "app/styles/home.module.css"
import { AppDispatch } from "./GlobalRedux/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import Image from 'next/image'
import { useAppSelector } from "./hooks"
import { getCategorySelection, setCategorySelection } from "./GlobalRedux/selectionSlice"
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

export function Splash ({args}: {args: string[]}) {
return (
  <span className='flex flex-row fixed w-screen lg:h-24 h-16 top-0 left-0
  bg-gradient-to-r from-pastel-coral via-pastel-yellow  to-yellow-compliment
  text-black
  shadow-xl shadow-blue-gray-800
  text-center items-center justify-center'>

    <div className="flex fixed flex-row w-full">
      {args.map((arg, index) => (
          <ProdEvent key={index} name={arg} />
          ))}
    </div>
    <div className={styles.title}>
    </div>
  <BarIcon path="cart.svg" width={380} height={280}></BarIcon>
  </span>
  )
}

function ProdEvent(props: ProdEventProps) {
    const dispatch = useDispatch()
    const selectedCategory = useAppSelector(getCategorySelection)
    const handleClick = () => { dispatch(setCategorySelection(props.name))   }
    return(
        <div className={`flex relative lg:mx-4 mx-2 p-3 lg:h-14 h-10 w-28 lg:text-3xl text-xl font-iosevka font-bold small-caps 
            hover:bg-purple-600 hover:rounded-lg hover:text-white hover:ring hover:ring-purple-300
             cursor-pointer select-none self-center text-center justify-center items-center 
             ${ selectedCategory === props.name ? 'bg-purple-700 rounded-lg text-white' : 'rounded-none bg-none text-black' } ` }
             onClick={handleClick}>
            {props.name}
        </div>
    )
}

function BarIcon(props: IconProps) {
  const dispatch = useAppDispatch()
  const cartVisible = useAppSelector(selectVisibleFlag)
  return (
    <div className="fixed flex w-1/4 h-24 top-0 right-0 justify-center">
      <div>
        <div className="lg:w-20 w-20 h-12 lg:h-12 lg:mt-8 mt-4 flex items-center justify-center cursor-pointer" onClick={()=> dispatch(toggleVisible(!cartVisible))}>
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
      <div className="absolute inset-0 flex items-center justify-center top-4 -left-2">
        <p className="w-5 h-5 text-xs font-semibold text-white p-1 bg-cyan-600 rounded-3xl font-sans-fira">{cartQuantity}</p>
      </div>
      : <div></div> }
    </div>
    )
    
  }



