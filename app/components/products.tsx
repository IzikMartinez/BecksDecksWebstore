import React, {useEffect, useState} from "react";
import { setSidebarSelection  } from "../GlobalRedux/sidebarSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import styles from "app/styles/home.module.css"
import { Bubble } from "./productBubbles/productBubbles";
import { ProductType } from "@/types";
import {ConvertToExpandedProducts, ExpandedProduct, selectAllProducts} from "../GlobalRedux/productSlice";
import useSWR from "swr";


function SideBar() {
  return (
      <div className='flex fixed lg:left-0 items-center lg:flex-col lg:w-36 lg:mx-6 lg:mt-4 lg:mb-0 mt-4 -mb-4 lg:h-screen h-8 left-0 w-screen' >
        <SidebarItem name="magic" extension="png"/>
        <SidebarItem name="pokemon" extension="png"/>
        <SidebarItem name="fab" extension="png"/>
          <SidebarItem name="yugioh" extension="svg"/>
          <SidebarItem name="lorcana" extension="png"/>
        {/*
        <SidebarItem name="Deck Boxes"></SidebarItem>
        <SidebarItem name="Card Sleeves"></SidebarItem>
        <SidebarItem name="Dice"></SidebarItem> 
        */}
      </div>
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

const productURL= "/api/products"
const loadingMessage = "Loading...";
const placeholderImage = "placeholder.jpg";

const fetcher = async (url: string) => {
    const res = await fetch(url, {method: "GET" })
    if(!res.ok) throw new Error('Failed to fetch data')
    const data: any = await res.json()
    const {PRODUCTS: productArray} = data
    return productArray
}

function renderProducts(products: ExpandedProduct[], selectedSidebar: string) {
    const filteredProducts = products.filter(product => product.product_category === selectedSidebar)
    if (filteredProducts.length > 0) {
        return filteredProducts.map((item) => (
            <div key={item.product_id}>
                <Bubble itemID={item.product_id} itemName={item.product_name} itemPrice={item.product_price!}
                        description={item.product_desc!} imgPath={placeholderImage}/>
            </div>
        ));
    }
    else return <div className={'flex w-screen text-black xl:text-2xl lg:text-xl text-lg font-iosevka font-semibold'}>Inventory for this category is being updated. Please try again later</div>;
}

export function ProductList() {
    const dispatch = useAppDispatch()
    const selectedSidebar = useAppSelector(state => state.sidebar)
    const { data: products, error, isLoading } = useSWR<ProductType[]>(productURL, fetcher)
    const allProducts = useAppSelector(selectAllProducts)

    useEffect(()=> {
        if(!isLoading && products) {
            dispatch(ConvertToExpandedProducts(products))
        }
    }, [isLoading, products])

    if(isLoading) return <div className="fixed flex justify-center items-center text-black">{loadingMessage}</div>

    return (
        <div className="fixed flex lg:flex-row flex-col max-w-screen max-h-screen lg:top-20 top-24 pt-8 justify-center">
            <SideBar />
            <div className="flex fixed flex-wrap xl:left-48 left-0 top-32 gap-6 xl:w-[85%] lg:w-8/12
            w-screen h-full mx-auto lg:pb-24 pb-36 pt-12 items-start justify-center overflow-auto">
                {renderProducts(allProducts, selectedSidebar)}
            </div>
        </div>
    )
}
