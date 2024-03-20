  "use client";
import { Splash } from "./topbar"
import { EventProduct } from "./body";


export default function Home() {
  const cartToggle = useAppSelector(selectVisibleFlag)
  return (
  <body>
    <div>
        <Splash args={["events", "products"]}/>
    </div>
    <div className={`flex w-screen h-screen justify-center items-center lg:top-24 top-16 bg-cover bg-[url('waves.svg')]`}>
      <EventProduct />
    </div>
    { cartToggle ? <Cart/> : <span></span> }
  </body>
)}


import { useAppSelector } from "./hooks";
import Cart from "./cart";
import { selectVisibleFlag } from "./GlobalRedux/cartSlice";





