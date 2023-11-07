import React, { forwardRef, useEffect, useImperativeHandle, useRef, Ref, useState } from "react";
import { setSidebarSelection  } from "../GlobalRedux/sidebarSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import styles from "app/styles/home.module.css"
import { Bubble } from "./itemBubbles";
import { FetchProducts, supabase } from "../utils/supabase";
import { Database, ProductType } from "../types/supabase";
import { ConvertToExpandedProducts, ExpandedProduct, removeAllproducts, selectAllProducts } from "../GlobalRedux/productSlice";
import useSWR from "swr";


function SideBar() {
  return (
    <span className={styles.sidebar}>
      <div className='fixed flex items-center lg:flex-col lg:w-36 lg:h-screen h-16 lg:left-8 left-0 w-screen' >
        <SidebarItem name="magic" extension="png" focused={false}/>
        <SidebarItem name="pokemon" extension="png" focused={false} />
        <SidebarItem name="fab" extension="png" focused={true} />
        <SidebarItem name="yugioh" extension="svg" focused={false} />
{/*         <SidebarItem name="Deck Boxes"></SidebarItem>
        <SidebarItem name="Card Sleeves"></SidebarItem>
        <SidebarItem name="Dice"></SidebarItem> */}
      </div>
    </span>
)}

interface sidebarItemProps {
  name: string,
  extension: string,
  focused: boolean,
}
interface sidebarRef {
  focus: ()=> void;
}

const SidebarItem = forwardRef<sidebarRef, sidebarItemProps>((props, ref) => {
  const dispatch = useAppDispatch()
  const file = props.name + "." + props.extension

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=> {
    if( props.focused && inputRef.current){
      inputRef.current.focus()
    }
  }, [props.focused])
  return (
    <span 
       ref={inputRef}
       className='flex items-center text-center justify-center lg:mb-6 lg:mx-auto lg:scale-100 scale-75 
                   mb-20 cursor-pointer grayscale hover:grayscale-0 focus:grayscale-0' 
       onClick={()=>dispatch(setSidebarSelection(props.name))}
    >
    <img src={file} height={200} width={200} />
  </span>
  )
})



export function ProductList() {
    const dispatch = useAppDispatch()
    const selectedSidebar = useAppSelector(state => state.sidebar)
    const [filteredProducts, setFilteredProducts] = useState<ExpandedProduct[]>()
    const { data: PRODUCTS, error, isLoading } = useSWR<ProductType[]>('supadata', FetchProducts)
    const allProducts = useAppSelector(selectAllProducts)
    {
    useEffect(()=> {
        if(!isLoading) {
          dispatch(ConvertToExpandedProducts(PRODUCTS!))
        }
    }, [isLoading])
    return (
      isLoading ? <div className="fixed flex justify-center items-center text-black">Loading...</div> :
      <div className='fixed flex flex-wrap lg:left-16 lg:top-24 left-0 top-16 h-screen w-screen items-center justify-center'>
        <SideBar />
        {allProducts.filter(product => product.product_category === selectedSidebar)?.map((item) => (
            <div key = {item.product_id}>
                <Bubble itemID={item.product_id} itemName={item.product_name} itemPrice={item.product_price!} description={item.product_desc!} imgPath="placeholder.jpg" /> 
            </div>
        ))}
      </div> 
      )}}
