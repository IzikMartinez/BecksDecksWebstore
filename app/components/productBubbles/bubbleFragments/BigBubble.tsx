import { BubbleProps, imgProps, cartProps, cartItem } from "../productBubbles"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { toggleSize } from "@/app/GlobalRedux/productSlice"
import { useAppSelector } from "@/app/hooks"
import { addToCart } from "@/app/GlobalRedux/cartSlice"
import { FetchImage } from "../productBubbles"

export default function BigBubble(props: BubbleProps) {
  const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(toggleSize(props.itemID))
    }
  return (
    <div className='relative flex left-0 top-0 max-w-screen w-screen h-screen justify-center items-center z-0' onClick={handleClick}>
        <div className='absolute lg:left-72 lg:top-24 flex flex-1 lg:flex-row lg:m-8 lg:p-4 lg:w-1/2 lg:h-1/2
        flex-col-reverse w-96 h-9/12 top-0 items-center justify-center
         bg-gradient-to-b from-blue-950 to-blue-400 rounded-2xl'>
            <div className={'flex flex-col'}>
                <FetchImage itemID={props.itemID} itemName={props.itemName} itemPrice={props.itemPrice} size={false}/>
                <AddToCartBtn id={props.itemID} name={props.itemName} price={props.itemPrice}/>
            </div>
            <BigBubbleTextContent name={props.itemName} price={props.itemPrice} description={props.description}/>
        </div>
    </div>
  )
}

interface bubble_text_content {
    name: string,
    price: number,
    description: string,
}
function BigBubbleTextContent(props: bubble_text_content) {
    return (
        <div className='flex flex-col pt-0 lg:pr-0 pr-8 justify-center'>
            <div className='flex select-none lg:mb-3 mb-1 mt-4 pt-2 justify-center items-center
                          text-center lg:text-3xl text-md font-texgyre-adventor small-caps font-semibold'>
                {props.name}
            </div>
            <div className='flex selct-none lg:my-3 my-1 justify-center items-center
                          text-center lg:text-3xl text-x font-texgyre-adventor small-caps font-semibold'>
                ${props.price}
            </div>
            <div
                className='lg:mt-12 mt-4 mx-auto select-none right-0 flex justify-center items-center
                text-center font-semibold lg:text-xl text-xs w-2/3'>
                {props.description}
            </div>
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
        <span
            className="flex justify-center items-center h-16 lg:w-56 w-36
             rounded-b-lg font-sans-fira font-bold text-xl text-stroke stroke-black
             bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600
             hover:bg-gradient-to-r hover:from-pink-600 hover:via-pink-300 hover:to-pink-600 cursor-pointer
             z-10"
      onClick={() => dispatch(addToCart(newCartItem!))}>
      ADD TO CART
    </span>
  )
}
