import React, { useEffect, useRef } from 'react';
import { useAppSelector } from './hooks';
import Layout from './layout'
import { useDispatch } from 'react-redux';
import { removeFromCart } from './GlobalRedux/cartSlice';



function Cart() {
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div className='absolute top-14 -right-2 flex flex-col justify-center items-center bg-gray-200 h-96 w-56 shadow-xl rounded-lg'>
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
  const quantity = useAppSelector(state => state.cartItems.cartItems.find(item => item.name === props.name)?.quantity)
  const total = useRef(0)
  useEffect(()=> {total.current = props.price * props.quantity},[props.quantity, props.price])
  return (
    <div>
    <div className='absolute bg-gray-600 hover:bg-gray-300 w-48 h-12 flex flew-row items-center justify-center top-0 right-0'>

      <div className='flex flex-grow'>{props.name}: ${props.price} ${total.current} </div>
      <div className='absolute flex right-16 z-10'>
       {quantity}
      </div>
    </div>
      <RemoveFromCartBtn name={props.name} />
    </div>
  )
}

interface RemoveBtnProps {
  name: string
}

function RemoveFromCartBtn(props: RemoveBtnProps) {
  const dispatch = useDispatch()
  return(
    <button className='absolute flex top-0 right-4 bg-pink-400 hover:bg-pink-800 h-12 w-10 cursor-pointer justify-center items-center text-center' onClick={()=>
    {
      console.log("Worked")
      dispatch(removeFromCart(props.name))}
    }>
      R 
    </button>
  )
}

export default Cart
