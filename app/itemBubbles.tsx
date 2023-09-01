import classNames from 'classnames/bind'
import React, { useRef, useState } from 'react'
import styles from "app/styles/home.module.css"
import bubblestyle from "app/styles/bubblestyle.module.css"

import { useAppSelector, useAppDispatch } from './hooks'
import { toggle } from './GlobalRedux/bubbleSlice'


interface BubbleProps {
  itemName: string, 
  itemPrice: number, 
  description: string
}

/*
export function Bubble(props: BubbleProps) {
  if(big === false) return smallBubble(props)
  else return bigBubble(props)
}
*/

export function Bubble(props: BubbleProps) {
  const [sizeFlag, setSizeFlag] = useState(false)
  const toggleSize = () => {
    
  }
  return (
    <div className='my-0'>
      <span className={bubblestyle.bubblebody} onClick={()=>setSizeFlag(!sizeFlag)}>
        <div>
          <img src="placeholder.jpg" alt="spon" className={sizeFlag === false ? 'w-64 h-44 text-center rounded-lg' : "w-96 h-72 text-center rounded-lg"}/>
        </div>
        <div className='flex w-64 h-7 bg-blue-400 text-white items-center justify-center text-2xl font-texgyre-adventor small-caps font-semibold'>
            {props.itemName}  <br />
        </div>
        <div className='flex w-64 h-8 bg-blue-400 text-white items-center justify-center text-xl font-texgyre-adventor font-bold'>
          ${props.itemPrice}
        </div>
      </span>
    <BubbleBtn/>
    </div>
  )
}

export function bigBubble(props: BubbleProps) {
  return (
    <div>

    </div>
  )
}

function BubbleBtn() {
  return (
    <span className={styles.addToCart}>
      ADD TO CART
    </span>
  )
}

function setState(arg0: (prevState: any) => { sizeFlag: boolean }) {
  throw new Error("Function not implemented.")
}
