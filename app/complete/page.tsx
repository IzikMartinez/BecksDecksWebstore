"use client"
import Link from 'next/link';
import React, { useContext } from 'react';
import {OrderNumberContext} from "@/app/context";
// Create a context

export default function Page() {
  // Use context consumer to get orderNo
  const orderNumber = useContext(OrderNumberContext);

  return (
      <html>
        <div className='flex flex-col h-1/4 w-1/3 text-center items-center justify-center bg-zinc-700 rounded-md'>
          <p className='text-white text-2xl'>Payment Complete</p>
          <p className='text-white text-xl px-2'>{`Thank you for your payment. Your order number is #${orderNumber}`}</p>
          <Link href="/">
            <p className='text-wave-blue-100 text-md mt-8'>Return Home</p>
          </Link>
        </div>
      </html>
  )
}

// generateOrderNumber 
// This function generates a random order number for the user.