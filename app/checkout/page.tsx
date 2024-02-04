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
import { number } from 'square/dist/types/schema';

const TAX = 0.0825

interface checkoutProps {
  total: number,
}

interface CartElementProps {
  id: string,
  name: string,
  price: number,
  quantity?: number,
}


export default function Cart() {
const total = useAppSelector(selectTotalCartPrice)
const cartStore = useAppSelector(state => state.cartItems)  
  return (
  <html>
  <div className='fixed flex h-screen top-32'>
    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-red-100 h-2/3 lg:w-96 w-1/3 top-32 pt-12 shadow-xl rounded-lg mx-2'>
      <div className='mt-4 flex-grow'>
        {cartStore.cartItems.map((cartItem) => (
            <div key = {cartItem.name}>
              <CartElement id={cartItem.id} name={cartItem.name} price={cartItem.price} quantity={0} />
            </div>
        ))} 
      </div>
      <ShippingOptions />
      <CartTotal total={total*TAX} text="Tax"/>
      <div className='mb-4'>
        <CartTotal total={total*(1+TAX)} text="Total"/>
      </div>
    </div>  
    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-red-100 h-2/3 lg:w-96 w-1/3 top-32 pt-12 shadow-xl rounded-lg mx-2'>
      <Checkout />

  </div>
  </div>
  </html>
    )
}

function CartElement(props: CartElementProps) {
const quantity = useAppSelector((state) => selectQuantity(state, props.id))
return (
  <div className='text-black font-iosevka'>
    {props.name}: ${props.price * quantity!}
  </div>
  )
}

type cartTotalProps = { total: number, text: string } 
function CartTotal({total, text}: cartTotalProps) {
  return (
    <span className='text-2xl font-bold text-gray-600 mb-6'>{text}: ${total.toFixed(2)}</span>
  )
}

function Checkout() {
  const total = useAppSelector(selectTotalCartPrice)
  const cents = total*TAX
  const signup = useAppSelector(getSignup)
  return (
    <div>
      <div>
        <PaymentForm
          applicationId='sq0idp-wBCAiutBqqRgY5o5lPYPPg'
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
              // this conditional reroutes to the PaymentSuccess page if the payment is successful
              if(payData.status === "COMPLETED") {
                
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


// ShippingOptions:
// This function returns the shipping options for the user to choose from.
// The user can choose to pick up the item in store, or have it shipped to them.
// As of now, only the "Pickup in store" option is available. UPS and USPS shipping options will be added in the future.
// This function should take an array of shipping options as an argument, and return a list of radio buttons for the user to choose from.
function ShippingOptions() {
  return (
    <div>
      <input type="radio" id="pickup" name="shipping" value="pickup" />
      <label htmlFor="pickup">Pickup in store: $0.00</label>
    </div>
  )
}
