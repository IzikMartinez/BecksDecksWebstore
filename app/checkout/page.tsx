'use client';
import React from 'react';
import { PaymentForm, PaymentFormProps, CreditCard, GooglePay} from 'react-square-web-payments-sdk';

interface checkoutProps {
  total: number,
}

export default function Checkout(props: PaymentFormProps) {
  return (
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
            body:  JSON.stringify(token.token)
          })
          alert(JSON.stringify(await response.json(), null, 2))
          console.log(await response.json())
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
        <GooglePay />
      </PaymentForm>
    {/*
    <input type='text' id='name' />
      */}
    </div>
  )
}

