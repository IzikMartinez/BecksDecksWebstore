"use client"
import React, {useCallback} from 'react';
import {useRouter} from "next/navigation";

export default function Page({params}: { params: {id: number} }) {
  const router = useRouter()
    const navigateHome = useCallback(()=> {
        router.push('/')
    }, [router])
  return (
      <div className={`flex h-screen w-screen items-center justify-center bg-cover bg-[url('waves.svg')] `}>
        <div className='flex flex-col w-1/4 h-1/3 rounded-md bg-slate-800 items-center justify-between text-center'>
            <div className='text-white text-2xl my-6'>Payment Complete</div>
            <div className='text-white text-xl lg:px-8 px-4'>{`Thank you for your payment. Your order number is #${params.id}`}</div>
            <div className='text-wave-blue-100 text-md mt-8 cursor-pointer my-4' onClick={navigateHome}>Return Home</div>
        </div>
      </div>
  )
}