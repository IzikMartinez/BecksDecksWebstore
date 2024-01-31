'use client';
import React, {useState} from 'react';
import { PaymentForm, PaymentFormProps, CreditCard, GooglePay} from 'react-square-web-payments-sdk';
import { useAppSelector } from '../hooks';
import { selectQuantity, selectTotalCartPrice } from '../GlobalRedux/cartSlice';
import styles from "app/styles/home.module.css"
import Link from 'next/link';
import {getSignup} from "@/app/GlobalRedux/signupSlice";
import {log} from "util";
import {useDispatch} from "react-redux";
import { EntrantType, UserType } from '@/types';

const TAX = 1.0825

interface checkoutProps {
  total: number,
}

interface CartElementProps {
  id: string,
  name: string,
  price: number,
  quantity?: number,
}
function CartElement(props: CartElementProps) {
const quantity = useAppSelector((state) => selectQuantity(state, props.id))
return (
  <div className='text-black font-iosevka'>
    {props.name}: ${props.price * quantity!}
  </div>
  )
}

type cartTotalProps = { total: number } 
function CartTotal({total}: cartTotalProps) {
  return (
    <span className='text-2xl font-bold text-gray-600 mb-6'>${total}</span>
  )
}


export default function Cart() {
const total = useAppSelector(selectTotalCartPrice)
const cartStore = useAppSelector(state => state.cartItems)  
  return (
    <div className='fixed flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-red-100 h-2/3 lg:w-96 w-1/3 top-32 pt-12 shadow-xl rounded-lg'>
      <div className='mt-4 flex-grow'>
        {cartStore.cartItems.map((cartItem) => (
            <div key = {cartItem.name}>
              <CartElement id={cartItem.id} name={cartItem.name} price={cartItem.price} quantity={0} />
            </div>
        ))} 
      </div>
      <Checkout />
      <div className='mb-4'>
        <CartTotal total={total}/>
      </div>
 
    </div>  )
}

function Checkout() {
const total = useAppSelector(selectTotalCartPrice)
  const cents = total*TAX
  const signup = useAppSelector(getSignup)
  return (
    <div>
      <div>
        <PaymentForm
          applicationId="sandbox-sq0idb--G0V3vOW-I9WjIejCWCVCQ"
          locationId="L5CQ4BZB5NCNX"
          cardTokenizeResponseReceived={async (token, buyer) => {
            const response = await fetch('/api/pay', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                sourceId: token.token,
                amount: cents.toFixed(2)
              })
            })
            const {body: bodyData} = await response.json()
            if(bodyData) {
              const {payment: payData} = JSON.parse(bodyData)
              alert(payData.status)
              if(payData.status === "COMPLETED" && signup.player_id) {
                const newUser: UserType = {
                    player_id: signup.player_id,
                    player_firstname: signup.player_firstname,
                    player_lastname: signup.player_lastname
                }
                poster('/api/entrants', newUser, signup.event_id!)
                console.log(signup)
                }
            }
            else alert("paymentMessage")
        }}
          createPaymentRequest={()=> ({
            countryCode: "US",
            currencyCode: "USD",
            lineItems: [
              {
                amount: String(cents),
                label: "Item to be purchased",
                id: "SKU-12345",
              imageUrl: "https://url-cdn.com/123ABC",
              pending: true,
              productUrl: "https://my-company.com/product-123ABC"
              }
            ],
            taxLineItems: [
              {
                label: "State Tax",
                amount: "8.25",
                pending: true,
              }
            ],
            requestBillingContact: false,
            requestShippingContact: false,
            shippingOptions: [
              {
                label: "Pickup in store",
                amount: "0.00",
                id: "1"
              }
            ],
            total: {
              label: "Total",
              amount: "41.79",
            }
            })
          }           >
          <CreditCard/>
        </PaymentForm>

      </div>
    </div>
  )
}

/*
function CheckoutInfo(props: checkoutProps) {
  return (
    <div>
      ${props.total*TAX}
    </div>
  )
}
*/
function CheckoutSplash() {
  return (
  <span className='flex flex-row fixed w-screen lg:h-24 h-16 top-0 left-0 bg-gradient-to-r from-pastel-coral via-pastel-yellow to-yellow-compliment text-black  shadow-xl shadow-blue-gray-800 text-center items-center justify-center'> 
      <Link href="/" className='absolut flex font-texgyre-adventor font-bold text-xl small-caps justify-center items-center w-32 lg:h-24 h-16'>
        <img src="/home.svg" alt="HOME" className={"absolute w-16 h-28 left-12 top-1/4"}/>
      </Link>

    <div className={styles.title}>
      SPARKLING CITY LGS
    </div>
  </span>
  )
}
0


const putter = async (url: string, newUser: UserType) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newUser)
  })
}
const poster = async (url: string, newUser: UserType, event_id: string) => {
  await putter('api/users', newUser)
  const newEntrant: EntrantType = {
    event_id: event_id,
    player_id: newUser.player_id!
  }
  const eventRes = await fetch(url, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(newEntrant)
  })
}
