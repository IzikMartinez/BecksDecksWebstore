  "use client";
import styles from "app/styles/home.module.css"
import { Splash } from "./topbar"
import { EventProduct } from "./events";
import { RootState, store } from "./GlobalRedux/store"
import { TypedUseSelectorHook, useSelector } from "react-redux";


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



function SideBar() {
  const items = [{id: 0, name: "Flesh and Blood"}, {id: 1, name: "Warhammer"}, {id: 2, name: "Magic"}]
  const selector = useAppSelector((state) => state.selection)
  return (
    <span className={styles.sidebar}>
      <div className='flex flex-grow' ></div>
    </span>
)}

interface sidebarItemProps {
  name: string
}
function SidebarItem(props: sidebarItemProps) {
  return (
  <span className={styles.sidebarItem}>
    {props.name}
  </span>
  )
}



