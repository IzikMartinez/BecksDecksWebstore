// This NextJS component is the payment complete page that is displayed after the user has completed the payment process.
// It displays a message to the user that the payment has been completed, and the order number.
// It also displays a button that allows the user to return to the home page.
// The user is also redirected to the home page after 5 seconds.
import React from 'react'
import Link from 'next/link';


export default function Page() {
  const orderNumber = generateOrderNumber();
  return (
  <html>
    <div className='flex flex-col h-1/4 w-1/3 text-center items-center justify-center bg-zinc-700 rounded-md'>
      <p className='text-white text-2xl'>Payment Complete</p>
      <p className='text-white text-xl px-2'>Thank you for your payment. Your order number is #{orderNumber}</p>
      <Link href="/">
        <p className='text-wave-blue-100 text-md mt-8'>Return Home</p>
      </Link>
    </div>
  </html>
  )
}

// generateOrderNumber 
// This function generates a random order number for the user.
function generateOrderNumber() {
  return Math.floor(Math.random() * 1000000);
}
