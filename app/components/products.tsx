import { useEffect, useState } from "react";
import { setSidebarSelection  } from "../GlobalRedux/sidebarSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import styles from "app/styles/home.module.css"
import { removeAllItems, addItem, fetchCategory, Product } from "../GlobalRedux/itemSlice";
import { Bubble } from "./itemBubbles";
import { supabase } from "../utils/supabase";
import { Database } from "../types/supabase";


function SideBar() {
    const selectedSidebar = useAppSelector(state => state.sidebar)
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
        <SidebarItem name={selectedSidebar} extension="png"></SidebarItem>
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



export function ProductList() {
    const selectedSidebar = useAppSelector(state => state.sidebar)
    const dispatch = useAppDispatch()
    const [items, setItems] = useState<Database['public']['Tables']['PRODUCTS']['Row'][]>([]);
    useEffect(()=> {
        dispatch(removeAllItems())
        const fetchSupabase = async () => {
          const { data: PRODUCTS, error } = await supabase
          .from('PRODUCTS')
          .select('*')
          return PRODUCTS
        }
        fetchSupabase().then(data=>{
          setItems(data!)
        })
       
        /*
        dispatch(addItem({item_ID: "rde8", name: "Wang", price: 80, description: "Karate", size: false}))
        */
    return () => {
    }}, [dispatch, selectedSidebar])
    return (
      <div className='fixed flex flex-wrap flex-grow left-16 top-24 h-screen w-screen items-center justify-center '>
        <SideBar />
        {items.map((item) => (
            <div key = {item.id}>
                {/*<Bubble itemID={item.id} itemName={item.name} itemPrice={item.price!} description={item.desc!} imgPath="placeholder.jpg" /> */}
                <Bubble itemID={"adhr"} itemName={"FLEIBO"} itemPrice={102} description={"Here's hoping"} imgPath="placeholder.jpg" />
            </div>
        ))}
      </div>)}