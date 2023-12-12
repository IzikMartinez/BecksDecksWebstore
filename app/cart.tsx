import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from './hooks';
import Layout from './layout'
import { useDispatch } from 'react-redux';
import { removeFromCart, selectQuantity, selectTotalCartPrice, setQuantity} from './GlobalRedux/cartSlice';
import Link from 'next/link';
import Image from 'next/image';



function Cart() {

const total = useAppSelector(selectTotalCartPrice)
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div className='fixed flex flex-col justify-center items-center bg-gray-300 h-2/3 lg:w-1/4 w-1/3 right-0 mr-8 top-16 pt-12 shadow-xl rounded-lg'>
      <div className='mt-4'>
          {cartStore.cartItems.map((cartItem) => (
              <div key = {cartItem.name}>
                <CartElement id={cartItem.id} name={cartItem.name} price={cartItem.price} quantity={0} />
              </div>
          ))} 
        </div>
      <span className='flex-grow'></span>
      <CartTotals />
          <ToCheckout total={total} />
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

interface checkoutProps {
  total: number
}
function ToCheckout(props: checkoutProps) {
  return(
        props.total > 0 ?
      <Link href="/checkout" className='bg-blue-800 py-2 px-4 rounded-lg mb-2 text-xl font-semibold '>Check Out</Link>
      : <span /> 
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
  const dispatch = useDispatch()
  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => { 
    const newNum = Number(event.target.value)
    if (newNum > 0)
      dispatch(setQuantity( { itemID: props.id, quantity: newNum } ))
    else if (newNum === 0)
      dispatch(removeFromCart(props.id))
  }
  return (
    <div className='bg-white drop-shadow-xl rounded-md lg:w-80 w-56 lg:h-12 h-20 flex lg:flew-row flex-col items-center justify-center top-0 right-0 mb-2'>
      <div className='absolute lg:w-80 w-32 flex flex-grow flex-wrap whitespace-normal break-words lg:left-2 left-1 top-1 lg:top-1/4 text-black font-sans-fira text-md lg:text-md '> 
        {props.name}: ${props.price * quantity!} 
      </div>
      <input 
        type='number'
        value={ quantity } 
        onChange={ handleChange }
        className='absolute flex lg:left-[ 14.5rem ] lg:bottom-0 lg:w-12 w-10 lg:h-12 h-20 bg-wave-blue-200 right-12 z-10 text-black font-iosevka text-lg '></input>
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
    <button
      className='absolute lg:h-12 h-20 w-12 right-0 py-3 px-4 rounded-r-md bg-pink-300 hover:bg-pink-800 cursor-pointer overflow-visible'
      onClick={()=>
        {
          dispatch(removeFromCart(props.id))}
        }
    >
      <img
      src="/trash.svg" 
      alt="trash" 
      className='absolute w-6 h-6 left-3 top-3'
      />
    </button>
  )
}

export default Cart
