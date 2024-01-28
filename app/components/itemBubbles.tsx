import React from 'react'
import BigBubble from './bubbleFragments/BigBubble'
import SmallBubble from './bubbleFragments/SmallBubble'

import { useAppSelector, useAppDispatch } from '../hooks'

export interface BubbleProps {
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

export interface imgProps {
  imgPath: string,
  imgAlt: string
}

export interface cartProps {
  id: string,
  name: string,
  price: number,
}

export interface cartItem {
  id: string,
  name: string,
  price: number,
  quantity: number
}
