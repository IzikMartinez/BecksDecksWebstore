"use client";
import {useRouter} from "next/navigation";
import { Providers } from "../GlobalRedux/provider"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return(
    <section>
      <Providers>
        <Splash/>
        <div className="flex lg:w-screen lg:h-full h-0 lg:top-32 lg:rounded-none items-center justify-center">
          {children}
        </div>
      </Providers>
    </section>
  )
}

function Splash () {
return (
  <span className='flex flex-row fixed w-screen lg:h-24 h-16 top-0 left-0 bg-gradient-to-r from-pastel-coral via-pastel-yellow to-yellow-compliment text-black  shadow-xl shadow-blue-gray-800 text-center items-center justify-center'> 
    <div className="flex fixed flex-row w-full">
      <HomeIcon/>
    </div>
    <div>
      SPARKLING CITY LGS
    </div>
  </span>
  )
}

function HomeIcon() {
  const router = useRouter()
  return (
    <div className='absolut flex font-texgyre-adventor font-bold text-xl small-caps justify-center items-center w-32 lg:h-24 h-16' onClick={()=> router.push('/')}>
      <img src="/home.png" alt="HOME" className={"absolute w-12 h-10 left-12 top-1/4 hover:fill-sky-50 cursor-pointer"}/>
    </div>
  )
}
