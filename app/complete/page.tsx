"use client"
import React, { useContext } from 'react';
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/app/hooks";
import {getOrderNumber} from "@/app/GlobalRedux/orderNoSlice";
// Create a context

export default function Page() {
  // Use context consumer to get orderNo
  const orderNumber = useAppSelector(getOrderNumber)
  const router = useRouter()

  return (
        <div className='flex flex-col h-1/4 w-1/3 text-center items-center justify-center bg-zinc-700 rounded-md'>
            <p className='text-white text-2xl'>Payment Complete</p>
            <p className='text-white text-xl px-2'>{`Thank you for your payment. Your order number is #${orderNumber}`}</p>
            <p className='text-wave-blue-100 text-md mt-8 cursor-pointer' onClick={()=>router.push('/')}>Return Home</p>
        </div>
  )
}

// generateOrderNumber 
// This function generates a random order number for the user.
