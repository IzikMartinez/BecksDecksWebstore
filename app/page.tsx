  "use client";
import styles from "app/styles/home.module.css"
import { Splash } from "./topbar"
import { EventProduct } from "./events";
import { RootState, store } from "./GlobalRedux/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function Home() {
  return (
  <body className={styles.home}>
    <div>
      <Splash></Splash>
    </div>
    <div className='fixed w-screen h-screen top-24'>
      <div>
        <SideBar />
      </div>
      <EventProduct />
    </div>
  </body>
)}


import { setSidebarSelection  } from "./GlobalRedux/sidebarSlice";
import { useAppDispatch } from "./hooks";

function SideBar() {
  const items = [{id: 0, name: "Flesh and Blood"}, {id: 1, name: "Warhammer"}, {id: 2, name: "Magic"}]
  const selector = useAppSelector((state) => state.sidebar)
  return (
    <span className={styles.sidebar}>
      <div className='absolute flex flex-col flex-grow justify-center items-center w-36 left-0' >
        <SidebarItem name="Magic"></SidebarItem>
        <SidebarItem name="Pokemon"></SidebarItem>
        <SidebarItem name="Flesh and Blood"></SidebarItem>
        <SidebarItem name="Deck Boxes"></SidebarItem>
        <SidebarItem name="Card Sleeves"></SidebarItem>
        <SidebarItem name="Dice"></SidebarItem>
        {selector}
      </div>
    </span>
)}

interface sidebarItemProps {
  name: string
}
function SidebarItem(props: sidebarItemProps) {
  const dispatch = useDispatch()
  return (
  <span className={styles.sidebarItem} onClick={()=>dispatch(setSidebarSelection(props.name))}>
    {props.name}
  </span>
  )
}



