import React from 'react';
import { useAppSelector } from './hooks';
import { useDispatch } from 'react-redux';
import { removeFromCart, selectQuantity, selectTotalCartPrice, setQuantity} from './GlobalRedux/cartSlice';
import Link from 'next/link';



function Cart() {
const total = useAppSelector(selectTotalCartPrice)
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div className='fixed flex flex-col justify-center items-center bg-slate-600
    h-2/3 lg:w-1/4 w-80 right-0 mr-8 top-16 pt-12 shadow-xl rounded-lg'>
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
    <div className='mb-4 text-white font-sans-fira'>
      Cart: ${total} <br /> Taxes: ${(total*0.0825).toFixed(2)} <br /> Total: ${(total*1.0825).toFixed(2)} </div>
  )
}

interface checkoutProps {
  total: number
}
function ToCheckout(props: checkoutProps) {
  return(
        props.total > 0 ?
      <Link href="/checkout" className='bg-blue-500 py-2 px-4 rounded-lg mb-2 text-xl font-semibold '>Check Out</Link>
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
  return (
    <div className='drop-shadow-lg lg:w-96 lg:h-12 w-fill h-fill
     flex lg:flew-row items-center justify-center top-0 right-0 mb-2'>
      <div className='lg:w-72 w-48 rounded-l-md break-words text-black font-sans-fira text-md text-center bg-white'>
        {props.name}: ${props.price * quantity!} 
      </div>
      <ItemQuantity id={props.id} price={props.price} name={props.name} quantity={props.quantity} />
      <RemoveFromCartBtn id={props.id} />
    </div>
  )
}

function ItemQuantity(props: cartItemProps) {
  const quantity = useAppSelector((state) => selectQuantity(state, props.id))
  const dispatch = useDispatch()
  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => { 
    const newNum = Number(event.target.value)
    if (newNum > 0)
      dispatch(setQuantity( { itemID: props.id, quantity: newNum } ))
    else if (newNum === 0)
      dispatch(removeFromCart(props.id))
  }
return(
      <input 
        type='number'
        value={ quantity } 
        onChange={ handleChange }
        className='flex lg:w-10 w-10 lg:h-12 h-20 bg-slate-400 z-10 text-black font-iosevka text-lg text-center'>
      </input>
)
}

interface RemoveBtnProps {
  id: string
}

function RemoveFromCartBtn(props: RemoveBtnProps) {
  const dispatch = useDispatch()
  return(
    <button
      className='lg:h-12 h-20 w-12 right-0 py-3 px-4 rounded-r-md bg-red-500 hover:bg-pink-800 cursor-pointer overflow-visible'
      onClick={()=>
        {
          dispatch(removeFromCart(props.id))}
        }
    >
      <img
      src="/trash.svg" 
      alt="trash" 
      className='w-6 h-6'
      />
    </button>
  )
}

export default Cart
