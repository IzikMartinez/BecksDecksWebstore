import classNames from 'classnames/bind'
import React, { useEffect, useRef, useState } from 'react'
import bubblestyle from "app/styles/bubblestyle.module.css"
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from './hooks'
import { toggleSize } from './GlobalRedux/itemSlice'
import { useDispatch } from 'react-redux'


interface BubbleProps {
  itemID: string,
  itemName: string, 
  itemPrice: number, 
  description: string,
  imgPath?: string
}


/*
export function Bubble(props: BubbleProps) {
const dispatch = useAppDispatch
  if(sizeFlag === false) return SmallBubble(props)
  else return (
<p>It worked</p>)
}
*/



export function Bubble(props: BubbleProps) {
//const dispatch = useAppDispatch
const inventory = useAppSelector(state => state.item.items)
/*const [imPath, setTempath] = useState<string>()
useEffect(()=> {
  const prefix = "/"
  const newPath = prefix + props.imgPath
  setTempath(newPath)
}, [props.imgPath])
*/
return (
  <div>
  { inventory.find((item) => item.item_ID === props.itemID)?.size ? 
  <SmallBubble itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} description={props.description} ></SmallBubble>  : 
  <BigBubble itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} description={props.description}/>  
  }
</div>
)}
function SmallBubble(props: BubbleProps){
const dispatch = useDispatch()
const inventory = useAppSelector(state => state.item.items)
  return (
      <div className={bubblestyle.bubbleBody} onClick={()=>dispatch(toggleSize(props.itemID))}>
        <ItemImage imgPath='/placeholder.jpg' imgAlt='placeholder' />
        <ItemText text={props.itemName}></ItemText>
        <ItemText text={'$'+props.itemPrice.toString()}></ItemText>
        <div>
          <BubbleBtn/>
        </div>
      </div>
  )
}

/*
function toggleHelper(itemID: string) {
  const dispatch = useDispatch;
  dispatch(toggleSize({ itemID: 'tens'}))
}
*/

export function BigBubble(props: BubbleProps) {
  const dispatch = useDispatch()
  return (
    <div className='mx-auto flex flex-row items-center justify-center w-2/3 h-2/3 bg-slate-600 rounded-2xl' onClick={()=>dispatch(toggleSize(props.itemID))}>
      <div className='left-20 relative flex mx-auto w-[48em] h-[36em] items-center justify-center'>
        <ItemImage imgAlt='spongebo' imgPath='/placeholder.jpg'/>
      </div>
      <div className='flex flex-col py-24'>
        <div className='flex flex-grow mb-3 justify-center items-center text-center text-3xl font-texgyre-adventor small-caps font-semibold'>
          {props.itemName}
        </div>
        <div className='flex flex-grow my-3 justify-center items-center text-center text-2xl font-texgyre-adventor small-caps font-semibold'>
          ${props.itemPrice}
        </div>
        <div className='mt-12 mx-auto right-0 flex justify-center items-center text-center font-semibold text-xl w-2/3'>
          {props.description}
        </div>
      </div>
    </div>
  )
}

interface imgProps {
  imgPath: string,
  imgAlt: string
}

const ItemImage: React.FC<imgProps> = ({ imgPath, imgAlt }) => {
  return (
        <Image 
          className={'w-auto h-auto text-center rounded-t-xl scale-105'}
          src={imgPath} 
          alt={imgAlt}
          width={736}
          height={552}
        />
  );
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