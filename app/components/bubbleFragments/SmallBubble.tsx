import { BubbleProps, imgProps, cartProps, cartItem } from "../itemBubbles"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/app/hooks"
import Image from "next/image"
import { useState, useEffect } from "react"
import { addToCart } from "@/app/GlobalRedux/cartSlice"
import { toggleSize } from "@/app/GlobalRedux/productSlice"
import bubblestyle from "app/styles/bubblestyle.module.css"

export default function SmallBubble(props: BubbleProps){
  const dispatch = useDispatch()
  const inventory = useAppSelector(state => state.productStore.products )
    return (
        <div className='flex flex-col items-center justify-center'>
          <div className={bubblestyle.bubbleBody} onClick={()=>dispatch(toggleSize(props.itemID))}>
            <FetchImage itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice}/>
            <ItemText text={props.itemName}></ItemText>
            <PriceText text={props.itemPrice.toString()}/>
          </div>
          <div>
            <AddToCartBtn id={props.itemID} name={props.itemName} price={props.itemPrice}/>
          </div>
        </div>
    )
}

interface fetchProps {
  itemID: string,
  itemName: string,
  itemPrice: number
}

{/* fetch the image from the supabase storage bucket and return an image component */}
/* write a unit test for this function */

async function fetchHelper(itemID: string) {
  const res = await fetch(`/api/${itemID}`)
  const {data: {publicUrl}} = await res.json()
  console.log(publicUrl)
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
  })
  return (
<Image 
          className={'absolute lg:w-66 w-44 h-100 top-0 select-none text-center items-center justify-center rounded-t-xl scale-[100%]'}
          src={imgPath} 
          alt={props.itemName}
          width={840}
          height={552}
        />
  )
}

interface textProps {
  text: string
} 
function ItemText(props: textProps) {
  return (
        <div className='absolute flex lg:w-66 w-48 select-none h-7 bg-blue-400 bottom-14 text-white items-center justify-center lg:text-xl text-sm font-texgyre-adventor small-caps font-semibold'>
            {props.text}  <br />
        </div>
  )
}
function PriceText(props: textProps) {
  return (
        <div className='absolute flex lg:w-66 w-48 select-none h-10 lg:bottom-4 bg-blue-400 text-white justify-center lg:text-xl font-texgyre-adventor small-caps font-semibold'>
            ${props.text}  <br />
        </div>
  )
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
