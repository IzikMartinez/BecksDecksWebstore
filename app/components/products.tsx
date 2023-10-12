import { useEffect } from "react";
import { setSidebarSelection  } from "../GlobalRedux/sidebarSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import styles from "app/styles/home.module.css"
import { removeAllItems, addItem } from "../GlobalRedux/itemSlice";
import { Bubble } from "../itemBubbles";


function SideBar() {
  const items = [{id: 0, name: "Flesh and Blood"}, {id: 1, name: "Warhammer"}, {id: 2, name: "Magic"}]
  const selected = useAppSelector((state) => state.sidebar)
  return (
    <span className={styles.sidebar}>
      <div className='absolute flex flex-col w-36' >
        <SidebarItem name="magic" extension="png"/>
        <SidebarItem name="pokemon" extension="png" />
        <SidebarItem name="fab" extension="png" />
        <SidebarItem name="yugioh" extension="svg" />
{/*         <SidebarItem name="Deck Boxes"></SidebarItem>
        <SidebarItem name="Card Sleeves"></SidebarItem>
        <SidebarItem name="Dice"></SidebarItem> */}
      </div>
    </span>
)}

interface sidebarItemProps {
  name: string,
  extension: string
}
function SidebarItem(props: sidebarItemProps) {
  const dispatch = useAppDispatch()
  const file = props.name + "." + props.extension
  return (
  <span className='flex items-center text-center justify-center mb-6 mx-auto cursor-pointer grayscale hover:grayscale-0' onClick={()=>dispatch(setSidebarSelection(props.name))}>
    <img src={file} height={200} width={200} />
  </span>
  )
}



export function Products() {
    const inventory = useAppSelector(state => state.item)
    const selectedSidebar = useAppSelector(state => state.sidebar)
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(removeAllItems())
        if(selectedSidebar === "magic")
            {
                dispatch(addItem({item_ID: "deas", name: "Chon", price: 40, description: "Karate Bruce Lee Jet Lee Jackie Chan", size: false, visible: true}))
            }
        else if(selectedSidebar === "fab")
            {
                dispatch(addItem({item_ID: "d3as", name: "Bright Lights Box", price: 90, description: "Play the best game better than magic better than universus better than vanguard and yugioh and luigi", size: false, visible: true}))
                dispatch(addItem({item_ID: "d2az", name: "Bright Lights Pack", price: 4.99, description: "Play the best game better than magic better than universus better than vanguard and yugioh and luigi", size: false, visible: true}))
            }
        /*
        dispatch(addItem({item_ID: "rde8", name: "Wang", price: 80, description: "Karate", size: false}))
        */
    return () => {
    }}, [dispatch, selectedSidebar])
    return (
      <div className='fixed flex flex-wrap flex-grow left-16 top-24 h-screen w-screen items-center justify-center '>
        <SideBar />
        {inventory.items.map((item) => (
            <div key = {item.item_ID}>
                <Bubble itemID={item.item_ID} itemName={item.name} itemPrice={item.price} description={item.description} imgPath="placeholder.jpg" />
            </div>
        ))}
      </div>)}