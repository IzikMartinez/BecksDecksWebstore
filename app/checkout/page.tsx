'use client';
import React from 'react';
import { PaymentForm, PaymentFormProps, CreditCard, GooglePay} from 'react-square-web-payments-sdk';
import { useAppSelector } from '../hooks';
import { selectTotalCartPrice } from '../GlobalRedux/cartSlice';
import styles from "app/styles/home.module.css"
import Link from 'next/link';


interface checkoutProps {
  total: number,
}

export default function Checkout(props: checkoutProps) {
  const total = useAppSelector(selectTotalCartPrice)
  return (
    <div>
      <CheckoutSplash/>
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
              amount: total
            })
          })
          alert(JSON.stringify(await response.json(), null, 2))
        }}
        createPaymentRequest={()=> ({
          countryCode: "US",
          currencyCode: "USD",
          lineItems: [
            {
              amount: "22.15",
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
        }
      >
        <CreditCard/>
      </PaymentForm>
    {/*
    <input type='text' id='name' />
      */}
    </div>
  )
}


export function CheckoutSplash() {
  return (
  <span className='flex flex-row fixed w-screen lg:h-24 h-16 top-0 left-0 bg-gradient-to-r from-pastel-coral via-pastel-yellow to-yellow-compliment text-black  shadow-xl shadow-blue-gray-800 text-center items-center justify-center'> 
    <div className="flex fixed flex-row w-full left-12 ">
      <Link href={ "/" } className='font-texgyre-adventor font-bold text-xl small-caps'>home</Link>
    </div>
    <div className={styles.title}>
      SPARKLING CITY LGS
    </div>
  </span>
  )
}
