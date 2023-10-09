import React, { useEffect, useRef } from 'react';
import { useAppSelector } from './hooks';
import Layout from './layout'
import { useDispatch } from 'react-redux';
import { removeFromCart, selectQuantity} from './GlobalRedux/cartSlice';



function Cart() {
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div className='absolute top-14 -right-2 flex flex-col justify-center items-center bg-gray-200 h-96 w-96 shadow-xl rounded-lg'>
      {cartStore.cartItems.map((cartItem) => (
          <div key = {cartItem.name}>
            <CartElement name={cartItem.name} price={cartItem.price} quantity={0} />
          </div>
      ))} 
    </div>
  )
}

interface cartItemProps {
  price: number,
  name: string,
  quantity: number
}

function CartElement(props: cartItemProps) {
  const quantity = useAppSelector((state) => selectQuantity(state, props.name))
  return (
    <div>
    <div className='bg-white drop-shadow-xl rounded-md w-80  h-12 flex flew-row items-center justify-center top-0 right-0 my-1'>

      <div className='absolute flex flex-grow left-2'>{props.name}: ${props.price * quantity!} </div>
      <div className='absolute flex right-16 z-10'>
       {quantity}
      </div>
      <RemoveFromCartBtn name={props.name} />
    </div>
    </div>
  )
}

interface RemoveBtnProps {
  name: string
}

function RemoveFromCartBtn(props: RemoveBtnProps) {
  const dispatch = useDispatch()
  return(
    <button className='absolute flex top-0 right-0 rounded-r-md bg-pink-400 hover:bg-pink-800 h-12 w-10 cursor-pointer justify-center items-center text-center' onClick={()=>
    {
      console.log("Worked")
      dispatch(removeFromCart(props.name))}
    }>
      R 
    </button>
  )
}

export default Cart
