"use client";
import Link from "next/link";
import { Providers } from "../GlobalRedux/provider"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <section>
      <Providers>
        <Splash args={["Home"]}/>
        <div className="flex w-screen h-full lg:top-32 items-center justify-center">
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
  return (
    <Link href="/" className='absolut flex font-texgyre-adventor font-bold text-xl small-caps justify-center items-center w-32 lg:h-24 h-16'>
      <img src="/home.png" alt="HOME" className={"absolute w-12 h-10 left-12 top-1/4 hover:fill-sky-50"}/>
    </Link>
  )
}
