import React from 'react';
import { useAppSelector } from '../hooks';

interface cartProps {
}

function Cart(props: cartProps) {
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div>
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
    <div>
      {props.name}: ${props.price}  
    </div>
  )
}
export default Cart
