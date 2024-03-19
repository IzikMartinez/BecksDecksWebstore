import { BubbleProps, imgProps, cartProps, cartItem } from "../productBubbles"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/app/hooks"
import { useState, useEffect } from "react"
import { addToCart } from "@/app/GlobalRedux/cartSlice"
import { toggleSize } from "@/app/GlobalRedux/productSlice"
import bubblestyle from "app/styles/bubblestyle.module.css"
import { FetchImage } from "../productBubbles"

export default function SmallBubble(props: BubbleProps){
  const dispatch = useDispatch()
  const inventory = useAppSelector(state => state.productStore.products )
    const handleClick = () => {
      const product_id = props.itemID
      dispatch(toggleSize(product_id))
    }
    return (
        <div className='xl:w-56 xl:h-66 xl:my-0
        lg:w-48
        w-40 h-64 my-14
        flex flex-col
        items-center justify-center mx-2'>
            <div className="flex flex-col">
                <span onClick={handleClick}>
                <FetchImage itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} size={true}/>
                <ItemText text={props.itemName}></ItemText>
                <PriceText text={props.itemPrice.toString()}/>
               </span>
                <AddToCartBtn id={props.itemID} name={props.itemName} price={props.itemPrice}/>
            </div>
        </div>
    )
}

interface textProps {
  text: string
} 
function ItemText(props: textProps) {
  return (
        <div className='flex w-fill select-none lg:h-10 bg-blue-400 bottom-14 text-white items-center justify-center text-center lg:text-md text-sm font-texgyre-adventor small-caps font-semibold'>

            {props.text}  <br />
        </div>
  )
}
function PriceText(props: textProps) {
  return (
        <div className='flex w-fill select-none lg:h-8 lg:bottom-4 bg-blue-400 text-white justify-center lg:text-xl font-texgyre-adventor small-caps font-semibold'>
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
    <div className="flex w-fill h-12 select-none items-center justify-center bottom-6 lg:-bottom-3 lg:text-gray-600 text-white bg-pastel-coral rounded-b-xl  shadow-gray-600 shadow-lg text-xl font-bold hover:bg-pastel-yellow font-sans-fira"
    onClick={() => dispatch(addToCart(newCartItem!))}>
      ADD TO CART
    </div>
  )
}
