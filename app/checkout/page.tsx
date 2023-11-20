'use client';
import React, {useState} from 'react';
import { PaymentForm, PaymentFormProps, CreditCard, GooglePay} from 'react-square-web-payments-sdk';
import { useAppSelector } from '../hooks';
import { selectTotalCartPrice } from '../GlobalRedux/cartSlice';
import styles from "app/styles/home.module.css"
import Link from 'next/link';
import {getSignup} from "@/app/GlobalRedux/signupSlice";
import {log} from "util";
import {useDispatch} from "react-redux";

const TAX = 1.0825

interface checkoutProps {
  total: number,
}

export default function Checkout(props: checkoutProps) {
  const total = useAppSelector(selectTotalCartPrice)
  const cents = total*TAX
  const signup = useAppSelector(getSignup)
  return (
    <div>
      <div><CheckoutSplash/>
        {cents.toFixed(2)}
      </div>
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
              if(payData.status === "COMPLETED")
                console.log(signup)
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
          }
          >
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
export function CheckoutSplash() {
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