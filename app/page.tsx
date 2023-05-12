import Image from 'next/image'
import styles from "app/styles/home.module.css"

interface BubbleProps {
  itemName: string, 
  itemPrice: number, 
  description: string
}

interface IconProps {
  path: string,
  width: number,
  height: number
}

export default function Home() {
  return (
  <body className={styles.home}>
    <div>
      <Splash></Splash>
    </div>
    <div className='fixed flex flex-row w-screen h-screen top-24'>
      <div>
        <SideBar />
      </div>
      <div className='fixed flex flex-wrap flex-grow left-24 top-8 h-screen items-center justify-center'>
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="Sponge" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="Bob" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="Lookin" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="like" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="a snack" itemPrice={100.00} description='lorem ipso factum'></Bubble>     
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="test" itemPrice={100.00} description='lorem ipso factum'></Bubble>
        <Bubble itemName="sponge" itemPrice={100.00} description='lorem ipso factum'></Bubble>
      </div>
    </div>
  </body>
)}

function Splash() {
  return (
  <span className='flex fixed w-screen h-24 top-0 left-0 bg-gradient-to-r from-pastel-coral via-pastel-yellow to-yellow-compliment text-black  shadow-xl shadow-blue-gray-800 text-center items-center justify-center'> 
    <div className={styles.title}>
      SPARKLING CITY LGS
    </div>
  <BarIcon path="cart.svg" width={180} height={180}></BarIcon>
  </span>
  )
}

function SideBar() {
  const items = [{id: 0, name: "Flesh and Blood"}, {id: 1, name: "Warhammer"}, {id: 2, name: "Magic"}]
  return (
    <span className={styles.sidebar}>
      {items.map(item => (
        <SidebarItem key={item.id} name={item.name} ></SidebarItem>
      ))}
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

function BarIcon(props: IconProps) {
  return (
    <span className='w-20 h-20 rounded-lg mr-6'>
      <Image src={props.path} alt='hold' width={props.width} height={props.height} />
    </span>
  )}

function Bubble(props: BubbleProps) {
  return (
    <div className='my-0'>
    <span className='flex flex-col w-64 h-56 items-center justify-center text-black rounded-lg mx-10 shadow-xl shadow-blue-gray-800'>
      <div className='flex flex-col flex-grow w-64 h-32 items-center justify-center bg-wave-blue-200 rounded-t-xl'>
        <img src="placeholder.jpg" alt="spon" className="w-48 h-36 text-center rounded-lg"/>
      </div>
      <div className='flex w-64 h-7 bg-blue-400 text-white items-center justify-center text-2xl font-texgyre-adventor small-caps font-semibold'>
          {props.itemName}  <br />
      </div>
      <div className='flex w-64 h-8 bg-blue-700 text-white items-center justify-center text-xl font-texgyre-adventor font-bold'>
        ${props.itemPrice}
      </div>
    </span>
    <BubbleBtn/>
    </div>
  )
}

function BubbleBtn() {
  return (
    <span className={styles.addToCart}>
      ADD TO CART
    </span>
  )
}