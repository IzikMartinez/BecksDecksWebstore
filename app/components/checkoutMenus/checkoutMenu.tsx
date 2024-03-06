import {PaymentWindow, ShippingOptions} from "@/app/components/paymentForms";
import {useAppSelector} from "@/app/hooks";
import {createContext, useContext, useState} from "react";
import {selectTotalCartPrice} from "@/app/GlobalRedux/cartSlice";
import {CartElement, CartTotal} from "@/app/checkout/page";
const TAX = 0.0825

const CheckoutMenuContext = createContext({
    isSwiped: false,
    setIsSwiped: (value: boolean) => {}
})

export default function MobileMenu() {
    const [isSwiped, setIsSwiped] = useState(false)
    return(
        <CheckoutMenuContext.Provider value={{isSwiped, setIsSwiped}}>
            <div>
                { isSwiped ? <MobileMenuPayment/> : <MobileMenuShipping/> }
            </div>
        </CheckoutMenuContext.Provider>
    )
}

function MobileMenuShipping() {
    const cartStore = useAppSelector(state => state.cartItems)
    const total = useAppSelector(selectTotalCartPrice)
    const {isSwiped, setIsSwiped} = useContext(CheckoutMenuContext)
    const handleSwipe = ()=> {
        setIsSwiped(!isSwiped)
    }
    let shippingStyle =  isSwiped?
        "flex flex-col w-80 h-[38rem] bg-gradient-to-b from-blue-500 to-red-100 rounded-lg transform -translate-x-96 transition-transform duration-300"
        : "flex flex-col w-80 h-[38rem] bg-gradient-to-b from-blue-500 to-red-100 rounded-lg transform translate-x-0 transition-transform duration-300"
    return(
    <div className={`${shippingStyle}`}>
        <div className='flex items-start justify-center lg:my-2 mt-8 flex-grow'>
            {cartStore.cartItems.map((cartItem) => (
                <div key={cartItem.name}>
                    <CartElement id={cartItem.id} name={cartItem.name} price={cartItem.price}
                                 quantity={0}/>
                </div>
            ))}
        </div>
        <ShippingOptions/>
        <CartTotal total={total * TAX} text="Tax"/>
        <div className=''>
            <CartTotal total={total * (1 + TAX)} text="Total"/>
        </div>
        <button
            className={'h-12 rounded-b-lg bg-gradient-radial from-green-500 to-green-700 font-bold text-xl'}
            onClick={handleSwipe}
        >Next
        </button>
    </div>
    )
}

function MobileMenuPayment() {
    const {isSwiped, setIsSwiped} = useContext(CheckoutMenuContext)
    const handleSwipe = ()=> {
        setIsSwiped(!isSwiped)
    }
    let shippingStyle =  isSwiped?
        "flex flex-col w-80 h-[38rem] bg-gradient-to-b from-blue-500 to-red-100 rounded-lg transform translate-x-0 transition-transform duration-300"
        : "flex flex-col w-80 h-[38rem] bg-gradient-to-b from-blue-500 to-red-100 rounded-lg transform translate-x-96 transition-transform duration-300"
    return (
        <div className={`${shippingStyle}`}>
            <div className='flex flex-col items-center justify-center lg:my-2 mt-8 flex-grow'>
                <button
                    className={'absolute h-12 w-full top-0 rounded-t-lg bg-gradient-radial from-purple-400 to-purple-700 font-bold text-xl'}
                    onClick={handleSwipe}
                >Back
                </button>
                <PaymentWindow/>
            </div>
        </div>
    )
}