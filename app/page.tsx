  "use client";
import styles from "app/styles/home.module.css"
import { Splash } from "./topbar"
import { EventProduct } from "./events";
import { useDispatch} from "react-redux";


export default function Home() {
  const cartToggle = useAppSelector(selectVisibleFlag)
  return (
  <body className={styles.home}>
    <div>
      <Splash></Splash>
    </div>
    <div className='fixed w-screen h-screen top-24'>
      <div>
      </div>
      <EventProduct />
    </div>
    { cartToggle ? <Cart/> : <span></span> }
  </body>
)}


import { useAppSelector } from "./hooks";
import Cart from "./cart";
import { selectVisibleFlag } from "./GlobalRedux/cartSlice";





