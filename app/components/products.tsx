import React, { useEffect } from "react";
import { setSidebarSelection  } from "../GlobalRedux/sidebarSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import styles from "app/styles/home.module.css"
import { Bubble } from "./itemBubbles";
import { ProductType } from "@/types";
import { ConvertToExpandedProducts, selectAllProducts } from "../GlobalRedux/productSlice";
import useSWR from "swr";


function SideBar() {
  return (
    <span className={styles.sidebar}>
      <div className='fixed flex items-center lg:flex-col lg:w-36 lg:h-screen h-16 lg:left-8 left-0 w-screen' >
        <SidebarItem name="magic" extension="png"/>
        <SidebarItem name="pokemon" extension="png"/>
        <SidebarItem name="fab" extension="png"/>
        <SidebarItem name="yugioh" extension="svg"/>
{/*         <SidebarItem name="Deck Boxes"></SidebarItem>
        <SidebarItem name="Card Sleeves"></SidebarItem>
        <SidebarItem name="Dice"></SidebarItem> */}
      </div>
    </span>
)}

interface sidebarItemProps {
  name: string,
  extension: string,
}

function SidebarItem(props: sidebarItemProps) {
  const dispatch = useAppDispatch()
  const file = props.name + "." + props.extension
  const selectedSidebar = useAppSelector(state => state.sidebar)
  const handleClick = ()=> {
  dispatch(setSidebarSelection(props.name))
  }
  return (
    <span 
       className={`flex items-center text-center justify-center lg:mb-6 lg:mx-auto lg:scale-100 scale-75 
                   mb-20 cursor-pointer ${ selectedSidebar == props.name ?  'grayscale-0' : 'grayscale'} hover:grayscale-0`} 
       onClick={handleClick}
    >
    <img src={file} height={200} width={200} />
  </span>
  )
}

const productURL= "http://localhost:3000/api/products"
const fetcher = async (url: string) => {
  const res = await fetch(url, {method: "GET" })
  if(!res.ok) throw new Error('Failed to fetch data')
  const data: any = await res.json()
  const {PRODUCTS: productArray} = data
  return productArray 
}

export function ProductList() {
    const dispatch = useAppDispatch()
    const selectedSidebar = useAppSelector(state => state.sidebar)
    const { data: PRODUCTS, error, isLoading } = useSWR<ProductType[]>(productURL, fetcher)
    const allProducts = useAppSelector(selectAllProducts)
    {
    useEffect(()=> {
        if(!isLoading && PRODUCTS) {
          dispatch(ConvertToExpandedProducts(PRODUCTS))
        }
    }, [isLoading, PRODUCTS])
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
