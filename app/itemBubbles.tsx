import classNames from 'classnames/bind'
import React, { useRef, useState } from 'react'
import styles from "app/styles/home.module.css"
import bubblestyle from "app/styles/bubblestyle.module.css"

import { useAppSelector, useAppDispatch } from './hooks'
import { toggle } from './GlobalRedux/itemSlice'


interface BubbleProps {
  itemName: string, 
  itemPrice: number, 
  description: string
}


export function Bubble(props: BubbleProps) {
const sizeFlag = useAppSelector(state => state.bubble.value)
const dispatch = useAppDispatch
  if(sizeFlag === false) return SmallBubble(props)
  else return (
<p>It worked</p>)
}



export function SmallBubble(props: BubbleProps) {
const sizeflag = useAppSelector(state => state.bubble.value)
const dispatch = useAppDispatch
  return (
      <div className={bubblestyle.bubbleBody} onClick={()=>dispatch(toggle())}>
        <ItemImage path="placeholder.jpg"> </ItemImage>
        <ItemText text={props.itemName}></ItemText>
        <ItemText text={'$'+props.itemPrice.toString()}></ItemText>
        <div>
          <BubbleBtn/>
        </div>
      </div>
  )
}

interface imgProps {
  path: string
}

function ItemImage(props: imgProps) {
  return (
      <div>
        <img src={props.path} alt="spon" className={'w-64 h-44 text-center rounded-t-lg'}/>
      </div>
  )
}

interface textProps {
  text: string
} 

function ItemText(props: textProps) {
  return (
        <div className='flex w-64 h-7 bottom-2 bg-blue-400 text-white items-center justify-center text-2xl font-texgyre-adventor small-caps font-semibold'>
            {props.text}  <br />
        </div>
  )
}

function BubbleBtn() {
  return (
    <span className={bubblestyle.addToCart}>
      ADD TO CART
    </span>
  )
}