import classNames from 'classnames/bind'
import React, { useEffect, useRef, useState } from 'react'
import bubblestyle from "app/styles/bubblestyle.module.css"
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../hooks'
import { toggleSize } from '../GlobalRedux/productSlice'
import { useDispatch } from 'react-redux'
import { addToCart } from '../GlobalRedux/cartSlice'


interface BubbleProps {
  itemID: string,
  itemName: string, 
  itemPrice: number, 
  description: string,
  imgPath?: string
}



export function Bubble(props: BubbleProps) {
const inventory = useAppSelector(state => state.productStore.products)
return (
  <div>
  { inventory.find((item) => item.product_id === props.itemID)?.visible ? 
    <VisibleBubble itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} description={props.description}></VisibleBubble> :
    <p></p>
  }
</div>
)}


function VisibleBubble(props: BubbleProps) {
const inventory = useAppSelector(state => state.productStore.products)
return (
  <div>
  { inventory.find((item) => item.product_id === props.itemID)?.size ? 
  <BigBubble itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} description={props.description}/>  :
  <SmallBubble itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} description={props.description} ></SmallBubble>  
  }
</div>
)
}

function SmallBubble(props: BubbleProps){
const dispatch = useDispatch()
const inventory = useAppSelector(state => state.productStore.products )
  return (
      <div className='flex flex-col items-center justify-center'>
        <div className={bubblestyle.bubbleBody} onClick={()=>dispatch(toggleSize(props.itemID))}>
          <ItemImage imgPath='/placeholder.jpg' imgAlt='placeholder' />
          <ItemText text={props.itemName}></ItemText>
          <ItemText text={'$'+props.itemPrice.toString()}></ItemText>
        </div>
        <div>
          <AddToCartBtn id={props.itemID} name={props.itemName} price={props.itemPrice}/>
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
    <div className='mx-auto flex flex-row items-center justify-center w-2/3 h-2/3 bg-gradient-to-b from-blue-900  to-blue-500 rounded-2xl transform transition-all duration-300 ease-linear' onClick={()=>dispatch(toggleSize(props.itemID))}>
      <div className='left-20 relative flex flex-col mx-auto w-[48em] h-[36em] items-center justify-center'>
        <ItemImage imgAlt='spongebo' imgPath='/placeholder.jpg'/>
        <AddToCartBtn id={props.itemID} name={props.itemName} price={props.itemPrice}></AddToCartBtn>
      </div>
      <div className='flex flex-col py-24'>
        <div className='flex flex-grow select-none mb-3 justify-center items-center text-center text-3xl font-texgyre-adventor small-caps font-semibold'>
          {props.itemName}
        </div>
        <div className='flex flex-grow selct-none my-3 justify-center items-center text-center text-2xl font-texgyre-adventor small-caps font-semibold'>
          ${props.itemPrice}
        </div>
        <div className='mt-12 mx-auto select-none right-0 flex justify-center items-center text-center font-semibold text-xl w-2/3'>
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
          className={'lg:w-66 w-52 h-120 select-none text-center items-center justify-center rounded-t-xl scale-[109%]'}
          src={imgPath} 
          alt={imgAlt}
          width={840}
          height={552}
        />
  );
}

interface textProps {
  text: string
} 

function ItemText(props: textProps) {
  return (
        <div className='relative flex lg:w-66 w-48 select-none h-7 lg:-bottom-2 bg-blue-400 text-white items-center justify-center lg:text-xl font-texgyre-adventor small-caps font-semibold'>
            {props.text}  <br />
        </div>
  )
}

interface cartProps {
  id: string,
  name: string,
  price: number,
}


interface cartItem {
  id: string,
  name: string,
  price: number,
  quantity: number
}

function AddToCartBtn(props: cartProps) {
  const dispatch = useDispatch()
  const [newCartItem, setNewCartItem] = useState<cartItem>()
  useEffect(() => {
    const cartItem: cartItem = {
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: 1
    }
    setNewCartItem(cartItem)
  }, [props.id, props.name, props.price])
  const cart = useAppSelector(state => state.cartItems)
  return (
    <span className={bubblestyle.addToCart}  onClick={() => dispatch(addToCart(newCartItem!))}>
      ADD TO CART
    </span>
  )
}
