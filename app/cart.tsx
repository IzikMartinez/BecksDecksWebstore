import React, { useEffect, useRef } from 'react';
import { useAppSelector } from './hooks';
import Layout from './layout'
import { useDispatch } from 'react-redux';
import { removeFromCart, selectQuantity, selectTotalCartPrice} from './GlobalRedux/cartSlice';



function Cart() {
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div>
      <div className='fixed top-16 -right-2 flex flex-col justify-center items-center bg-gray-300 h-2/3 w-96 shadow-xl rounded-lg'>
        {cartStore.cartItems.map((cartItem) => (
            <div key = {cartItem.name}>
              <CartElement name={cartItem.name} price={cartItem.price} quantity={0} />
            </div>
        ))} 
        <span className='flex-grow'></span>
        <CartTotals />
      </div>
    </div>
  )
}

function CartTotals() {
  const total = useAppSelector(selectTotalCartPrice)
  return (
    <div className='mb-4'>
      Cart: ${total} <br /> Taxes: ${(total*0.0825).toFixed(2)} <br /> Total: ${(total*1.0825).toFixed(2)} </div>
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
    <div className='bg-white drop-shadow-xl rounded-md w-80 h-12 flex flew-row items-center justify-center top-0 right-0 my-1'>
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
    <button className='fixed flex top-0 right-0 p-3 rounded-r-md bg-pink-400 hover:bg-pink-800 h-12 w-10 cursor-pointer justify-center items-center text-center' onClick={()=>
    {
      console.log("Worked")
      dispatch(removeFromCart(props.name))}
    }>
      R 
    </button>
  )
}

export default Cart
