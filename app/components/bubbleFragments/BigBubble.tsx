import { BubbleProps, imgProps, cartProps, cartItem } from "../itemBubbles"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { toggleSize } from "@/app/GlobalRedux/productSlice"
import { useAppSelector } from "@/app/hooks"
import { addToCart } from "@/app/GlobalRedux/cartSlice"
import { FetchImage } from "../itemBubbles"

export default function BigBubble(props: BubbleProps) {
  const dispatch = useDispatch()
  return (
    <div className='flex w-2/3 mx-auto my-auto justify-center items-center bg-gradient-to-b from-blue-950 to-blue-400 rounded-2xl' onClick={()=>dispatch(toggleSize(props.itemID))}>
        <div className='relatve flex flex-col mx-auto w-[48em] h-[36em] items-center justify-center'>
            <FetchImage itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} size={false}/>
        </div>
        <div className='flex flex-col pt-0 lg:pr-0 pr-8 justify-center'>
            <div className='flex select-none mb-3 justify-center items-center 
                          text-center lg:text-3xl text-xl font-texgyre-adventor small-caps font-semibold'>
              {props.itemName}
            </div>
            <div className='flex selct-none my-3 justify-center items-center 
                          text-center lg:text-3xl text-xl font-texgyre-adventor small-caps font-semibold'>
              ${props.itemPrice}
            </div>
            <div className='mt-12 mx-auto select-none right-0 flex justify-center items-center text-center font-semibold lg:text-xl w-2/3'>
              {props.description}
            </div>
        </div>
    </div>
  )
}

interface newImgProps {
  image: imgProps,
  btn: cartProps
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
    <span 
      className="flex justify-center items-center bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600 h-16 lg:w-72 w-60 rounded-b-lg 
    font-sans-fira font-bold text-xl hover:bg-gradient-to-r hover:from-pink-600 hover:via-pink-300 hover:to-pink-600 cursor-pointer" 
      onClick={() => dispatch(addToCart(newCartItem!))}>
      ADD TO CART
    </span>
  )
}
