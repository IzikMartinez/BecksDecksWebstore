import React, { useEffect, useRef } from 'react';
import { useAppSelector } from './hooks';
import Layout from './layout'
import { useDispatch } from 'react-redux';
import { removeFromCart, selectQuantity, selectTotalCartPrice} from './GlobalRedux/cartSlice';



function Cart() {
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div className='fixed flex flex-col justify-center items-center bg-gray-300 h-2/3 w-1/4 right-0 mr-8 top-16 pt-12 shadow-xl rounded-lg'>
      <div className='mt-4'>
          {cartStore.cartItems.map((cartItem) => (
              <div key = {cartItem.name}>
                <CartElement id={cartItem.id} name={cartItem.name} price={cartItem.price} quantity={0} />
              </div>
          ))} 
        </div>
      <span className='flex-grow'></span>
      <CartTotals />
    </div>
  )
}

function CartTotals() {
  const total = useAppSelector(selectTotalCartPrice)
  return (
    <div className='mb-4 text-black font-sans-fira'>
      Cart: ${total} <br /> Taxes: ${(total*0.0825).toFixed(2)} <br /> Total: ${(total*1.0825).toFixed(2)} </div>
  )
  
}

interface cartItemProps {
  id: string,
  price: number,
  name: string,
  quantity: number
}

function CartElement(props: cartItemProps) {
  const quantity = useAppSelector((state) => selectQuantity(state, props.id))
  return (
    <div className='bg-white drop-shadow-xl rounded-md w-80 h-12 flex flew-row items-center justify-center top-0 right-0 mb-2'>
      <div className='absolute flex flex-grow left-2 text-black font-sans-fira'>{props.name}: ${props.price * quantity!} </div>
      <div className='absolute flex right-16 z-10 text-black font-sans-fira'> {quantity}</div>
      <RemoveFromCartBtn id={props.id} />
    </div>
  )
}

interface RemoveBtnProps {
  id: string
}

function RemoveFromCartBtn(props: RemoveBtnProps) {
  const dispatch = useDispatch()
  return(
    <button className='absolute right-0 py-3 px-4 rounded-r-md bg-pink-400 hover:bg-pink-800 cursor-pointer justify-center items-center text-center overflow-visible' onClick={()=>
    {
      dispatch(removeFromCart(props.id))}
    }>
      Re 
    </button>
  )
}

export default Cart
