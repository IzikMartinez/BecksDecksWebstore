import React, {createContext, ReactNode, useEffect, useState} from 'react'
import BigBubble from '@/app/components/productBubbles/bubbleFragments/BigBubble'
import SmallBubble from '@/app/components/productBubbles/bubbleFragments/SmallBubble'
import Image from 'next/image'
import { useAppSelector } from '../../hooks'

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

  const foundItem = inventory.find((item) => item.product_id === props.itemID);

  if (foundItem?.size) {
    return (
          <BigBubble itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} description={props.description}/>
    )
  }

  return (
        <SmallBubble itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} description={props.description}/>
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

interface fetchProps {
  itemID: string,
  itemName: string,
  itemPrice: number
  size: boolean 
}

{/* fetch the image from the supabase storage bucket and return an image component */}
/* write a unit test for this function */

async function fetchHelper(itemID: string) {
  const res = await fetch(`/api/${itemID}`)
  const {data: {publicUrl}} = await res.json()
  return publicUrl
}

export function FetchImage(props: fetchProps) {
  const [imgPath, setImgPath] = useState<string>('')
  useEffect(() => {
  {/* call the fetch api to get the image from the supabase storage bucket */}
  {/* the api request is a get request that uses the itemID as a parameter */}
    fetchHelper(props.itemID).then((res) => {
      setImgPath(res)
    })
  }, [props.itemID])

  const sizeFlag = (props.size) ? 
    'absolute select-none object-contain' :
    'select-none rounded-sm object-contain'

  const divClass = (props.size) ?
      'lg:h-48 h-44 lg:mt-12 ' :
      'lg:h-80 h-56'
  return (
    imgPath !== ''  ? (
      <div className={`relative w-11/12 ${divClass}`}>
        <Image
          className={sizeFlag}
          src={imgPath}
          alt={props.itemName}
          fill={true}
          sizes="(max-width: 600px) 480px"
        />
      </div>
    ) :
        ( <div></div>)
  )
}