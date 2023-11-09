import { BubbleProps, imgProps, cartProps, cartItem } from "../itemBubbles"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { toggleSize } from "@/app/GlobalRedux/productSlice"
import { useAppSelector } from "@/app/hooks"
import { addToCart } from "@/app/GlobalRedux/cartSlice"
import Image from "next/image"

export default function BigBubble(props: BubbleProps) {
  const dispatch = useDispatch()
  return (
    <div className='fixed lg:top-64 lg:left-1/4 left-1/4 top-1/3 lg:w-3/6 w-4/6 h-1/2 flex flex-row items-center justify-center bg-gradient-to-b from-blue-900  to-blue-500 rounded-2xl transform transition-all duration-300 ease-linear' onClick={()=>dispatch(toggleSize(props.itemID))}>
      <div className='left-12 relative flex flex-col mx-auto w-[48em] h-[36em] items-center justify-center'>
          <ItemImage 
            image={ { imgPath: '/placeholder.jpg',  imgAlt: 'placeholder' }} 
            btn={ { id: props.itemID, name: props.itemName, price: props.itemPrice}}   
          />
      </div>
      <div className='flex flex-col pt-0 lg:pr-28 pr-8'>
        <div className='flex flex-grow select-none mb-3 justify-center items-center 
                      text-center text-3xl font-texgyre-adventor small-caps font-semibold'>
          {props.itemName}
        </div>
        <div className='flex flex-grow selct-none my-3 justify-center items-center 
                      text-center text-3xl font-texgyre-adventor small-caps font-semibold'>
          ${props.itemPrice}
        </div>
        <div className='mt-12 mx-auto select-none right-0 flex justify-center items-center text-center font-semibold text-xl w-2/3'>
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

const ItemImage: React.FC<newImgProps> = ({image: { imgPath, imgAlt }, btn: { id, name, price}}) => {
  return (
    <div className="absolute flex flex-col w-72 lg:left-24 left-2 top-1/4  ">
        <Image 
          className={'lg:w-72 w-60 lg:h-56 h-48 select-none items-center justify-center rounded-t-xl lg:scale-[100%] scale-100'}
          src={imgPath} 
          alt={imgAlt}
          width={840}
          height={552}
        />
        <AddToCartBtn id={id} name={name} price={price}></AddToCartBtn>
    </div>
  );
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
