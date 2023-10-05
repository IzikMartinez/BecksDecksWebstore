import React from 'react';
import { useAppSelector } from './hooks';
import Layout from './layout'

interface cartProps {
}

function Cart(props: cartProps) {
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div className='absolute top-12  right-0 flex flex-col justify-center items-center bg-wave-blue-400 h-96 w-56'>
      {cartStore.cartItems.map((cartItem) => (
          <div key = {cartItem.name}>
            <CartElement name={cartItem.name} price={cartItem.price} quantity={0}/>
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
  return (
    <div className='bg-gray-600 w-48 h-12'>
      {props.name}: ${props.price}  
    </div>
  )
}

function RemoveFromCartBtn(itemName: string ) {
}
export default Cart
