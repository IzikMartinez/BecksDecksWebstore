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
        <div className='absolute left-72 top-24 flex flex-1 m-8 p-4 w-1/2 h-1/2 items-center justify-center bg-gradient-to-b from-blue-950 to-blue-400 rounded-2xl'>
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
            <div className='flex select-none mb-3 justify-center items-center
                          text-center lg:text-3xl text-xl font-texgyre-adventor small-caps font-semibold'>
                {props.name}
            </div>
            <div className='flex selct-none my-3 justify-center items-center
                          text-center lg:text-3xl text-xl font-texgyre-adventor small-caps font-semibold'>
                ${props.price}
            </div>
            <div
                className='mt-12 mx-auto select-none right-0 flex justify-center items-center text-center font-semibold lg:text-xl w-2/3'>
                {props.description}
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
            className="flex justify-center items-center bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600
             h-16 lg:w-66 w-60 rounded-b-lg font-sans-fira font-bold text-xl text-stroke stroke-black
             hover:bg-gradient-to-r hover:from-pink-600 hover:via-pink-300 hover:to-pink-600 cursor-pointer
             z-10"
      onClick={() => dispatch(addToCart(newCartItem!))}>
      ADD TO CART
    </span>
  )
}
