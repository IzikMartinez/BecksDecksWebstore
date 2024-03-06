'use client';
import {useEffect, useState} from 'react';
import { useAppSelector } from '../hooks';
import { selectQuantity, selectTotalCartPrice } from '../GlobalRedux/cartSlice';
import {PaymentWindow, ShippingOptions} from "@/app/components/paymentForms";
import {FormValidityContext} from "@/app/context";
import useMobileDetect from "@/app/utils/useMobileDetect";
import checkAndSplit from "@/app/utils/splitStrings";
import MobileMenu from "@/app/components/checkoutMenus/checkoutMenu";

const TAX = 0.0825
interface CartElementProps {
  id: string,
  name: string,
  price: number,
  quantity?: number,
}

export default function Cart() {
    const total = useAppSelector(selectTotalCartPrice)
    const cartStore = useAppSelector(state => state.cartItems)
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const {isMobile} = useMobileDetect()
    const [isSwiped, setIsSwiped] = useState(false)


    if(isMobile) {
        return (
            <FormValidityContext.Provider value={{
                firstNameValid, lastNameValid, emailValid, phoneValid,
                setFirstNameValid, setLastNameValid, setEmailValid, setPhoneValid,
                firstName, lastName, email, phone,
                setFirstName, setLastName, setEmail, setPhone,
            }}>
                <MobileMenu/>
            </FormValidityContext.Provider>
        )
    } else {
        return (
            <FormValidityContext.Provider value={{
                firstNameValid, lastNameValid, emailValid, phoneValid,
                setFirstNameValid, setLastNameValid, setEmailValid, setPhoneValid,
                firstName, lastName, email, phone,
                setFirstName, setLastName, setEmail, setPhone,
            }}>
                <div className='fixed flex h-screen top-32'>
                    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-red-100
        h-2/3 lg:w-96 w-1/3 top-32 pt-12 shadow-xl rounded-lg mx-2'>
                        <div className='mt-4 flex-grow'>
                            {cartStore.cartItems.map((cartItem) => (
                                <div key={cartItem.name}>
                                    <CartElement id={cartItem.id} name={cartItem.name} price={cartItem.price}
                                                 quantity={0}/>
                                </div>
                            ))}
                        </div>
                        <ShippingOptions/>
                        <CartTotal total={total * TAX} text="Tax"/>
                        <div className='mb-4'>
                            <CartTotal total={total * (1 + TAX)} text="Total"/>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-red-100
        h-2/3 lg:w-96 w-1/3 top-32 pt-12 shadow-xl rounded-lg mx-2'>
                        <PaymentWindow/>
                    </div>
                </div>
            </FormValidityContext.Provider>
        )
    }
}

export function CartElement(props: CartElementProps) {
const quantity = useAppSelector((state) => selectQuantity(state, props.id))
return (
  <div className='flex-row lg:text-black font-iosevka lg:mx-0 lg:px-0 px-8'>
      <span className={'text-black bg-white p-2 rounded-l font-semibold flex-grow'}>
       {checkAndSplit(props.name)}:
      </span>
      <span className={'lg:text-white bg-black p-2 rounded-r font-bold'}>
       ${props.price * quantity!}
      </span>
      <span>

      </span>
  </div>
  )
}

type cartTotalProps = { total: number, text: string } 
export function CartTotal({total, text}: cartTotalProps) {
  return (
    <span className='flex text-2xl font-bold text-gray-600 my-2 items-center justify-center'>{text}: ${total.toFixed(2)}</span>
  )
}