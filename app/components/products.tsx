import { useEffect, useState } from "react";
import { setSidebarSelection  } from "../GlobalRedux/sidebarSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import styles from "app/styles/home.module.css"
import { Bubble } from "./itemBubbles";
import { FetchProducts, supabase } from "../utils/supabase";
import { Database, ProductType } from "../types/supabase";
import { ConvertToExpandedProducts, ExpandedProduct, removeAllproducts, selectAllProducts } from "../GlobalRedux/productSlice";
import useSWR from "swr";


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
    const dispatch = useAppDispatch()
    const selectedSidebar = useAppSelector(state => state.sidebar)
    const [filteredProducts, setFilteredProducts] = useState<ExpandedProduct[]>()
    const { data: PRODUCTS } = useSWR<ProductType[]>('supadata', FetchProducts)
    const allProducts = useAppSelector(selectAllProducts)
    useEffect(()=> {
        dispatch(removeAllproducts())
        dispatch(ConvertToExpandedProducts(PRODUCTS!))
        setFilteredProducts(allProducts.filter(product => product.product_category === selectedSidebar))
}, [selectedSidebar])
    return (
      <div className='fixed flex flex-wrap flex-grow left-16 top-24 h-screen w-screen items-center justify-center '>
        <SideBar />
        {filteredProducts?.map((item) => (
            <div key = {item.product_id}>
                <Bubble itemID={item.product_id} itemName={item.product_name} itemPrice={item.product_price!} description={item.product_desc!} imgPath="placeholder.jpg" /> 
            </div>
        ))}
      </div>)}