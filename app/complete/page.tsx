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
      <div className={`flex h-screen w-screen items-center justify-center bg-cover bg-[url('waves.svg')] `}>
        <div className='flex flex-col w-1/4 h-1/3 rounded-md bg-slate-800 items-center justify-between text-center'>
            <div className='text-white text-2xl my-6'>Payment Complete</div>
            <div className='text-white text-xl lg:px-8 px-4'>{`Thank you for your payment. Your order number is #${orderNumber}`}</div>
            <div className='text-wave-blue-100 text-md mt-8 cursor-pointer my-4' onClick={()=>router.push('/')}>Return Home</div>
        </div>
      </div>
  )
}

// generateOrderNumber 
// This function generates a random order number for the user.
