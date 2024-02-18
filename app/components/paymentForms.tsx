// ShippingOptions:
// This function returns the shipping options for the user to choose from.
// The user can choose to pick up the item in store, or have it shipped to them.
// As of now, only the "Pickup in store" option is available. UPS and USPS shipping options will be added in the future.
// This function should take an array of shipping options as an argument, and return a list of radio buttons for the user to choose from.
// set pick up in store to be a radio that is checked by default and USPS and UPS to be disabled
import styles from "app/styles/home.module.css";
import {useDispatch} from "react-redux";
import {getError, setEmail, setFirstName, setLastName, setPhone} from "@/app/GlobalRedux/validateSlice";
import React, {useEffect, useState} from "react";
import { Checkout } from "@/app/checkout/page"
import {useAppSelector} from "@/app/hooks";
import Link from "next/link";
import { OrderType, OrderTypeInsert } from "@/types";
import {OrderNumberContext} from "@/app/context";

export function ShippingOptions() {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between'>
                <label htmlFor='pickup' className='text-black font-iosevka'>Pickup in store: $0.00</label>
                <input type='radio' id='pickup' name='shipping' value='pickup' defaultChecked className='text-black font-iosevka'/>
            </div>
            <div className='flex flex-row justify-between'>
                <label htmlFor='usps' className='text-black font-iosevk'>USPS: n/a</label>
                <input type='radio' id='usps' name='shipping' value='usps' disabled className='text-black font-iosevka'/>
            </div>
            <div className='flex flex-row justify-between'>
                <label htmlFor='ups' className='text-black font-iosevka'>UPS: n/a</label>
                <input type='radio' id='ups' name='shipping' value='ups' disabled className='text-black font-iosevka '/>
            </div>
        </div>
    )
}

type UserFormProps = {
    text: string,
    dataType: string,
}

// UserForm:
// This function accepts the first name, last name, and email of the user as props.
// If dataType is an email, verify that the email is valid.
// If dataType is a phone number, verify that the phone number is valid.
// If dataType is a name, verify that the name is valid.
// instead of labels, use placeholders
// If any of the fields are invalid, set the state of isValid to false and append the invalid fields to the fields array.
function UserForm({text, dataType}: UserFormProps) {
// from the validateSlice import the setters for the user's personal information
    const dispatch = useDispatch()
    // create a handler that will set the user's personal information when the user finishes typing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        if(dataType === 'firstName') { dispatch(setFirstName(text)) }
        else if(dataType === 'lastName') { dispatch(setLastName(text)) }
        else if(dataType === 'email') { dispatch(setEmail(text)) }
        else { dispatch(setPhone(text)) }
    }
    if(dataType === 'email') {
        return (
            <div className='flex flex-col'>
                <input type='email' placeholder={text} className={styles.userform} onChange={handleChange}/>
            </div>
        )
    } else if(dataType === 'phone') {
        return (
            <div className='flex flex-col'>
                <input type='tel' placeholder={text} className={styles.userform} onChange={handleChange} />
            </div>
        )} else {
        return (
            <div className='flex flex-col'>
                <input type='text' placeholder={text} className={styles.userform} onChange={handleChange}/>
            </div>
        )
    }
}



// UserEntry:
// This function returns a form for the user to enter their first name, last name, and email.
// The user can also enter their phone number, but this is optional.
// This function accepts an argument:
// setIsValid: a function that sets the state of whether the user's personal information is valid, and the fields that are invalid
function UserEntry() {
    return (
        <div>
            <UserForm text='First Name' dataType='firstName'/>
            <UserForm text='Last Name' dataType='lastName' />
            <UserForm text='Email' dataType='email'/>
            <UserForm text='Phone Number (optional)' dataType='phone'/>
        </div>
    )
}

// PaymentSwitch:
// This function renders a button that the user can click to switch between payment options.
// If the user chooses to pay in store, the user will be informed how long the store will hold the item for them.
// If the user chooses to pay online, the buttons will disappear and the user will be presented with a form to enter their payment information.
// This method takes a boolean as an argument.
// isValid: a boolean that determines whether the user's personal information is valid
function PaymentSwitch() {
    const [paymentMethod, setPaymentMethod] = useState('')
    if(paymentMethod === 'Pay in store') {
        return (
            <CompletePayment />
        )
    } else if(paymentMethod === 'Pay online') {
        return (
            <div>
                <Checkout />
            </div>
        )
    } else {
        return (
            <PaymentOptions setPaymentMethod={setPaymentMethod}/>
        )
    }
}

// PaymentOptions:
// This function presents the user with the option to pay in store, or to pay online.
function PaymentOptions({setPaymentMethod}: {setPaymentMethod: (method: string) => void}) {
    return (
        <div className='flex flex-col justify-between'>
            <PaymentButton text='Pay in store' setPaymentMethod={setPaymentMethod}/>
            <PaymentButton text='Pay online' setPaymentMethod={setPaymentMethod}/>
        </div>
    )
}

// PaymentButton:
// This function returns a button that the user can click to select their payment method.
// This function uses state to keep track of the payment method that the user has selected and passes the selected payment method to the PaymentOptions function.
// This function accepts two inputs:
// text: the text that will be displayed on the button
// setPaymentMethod: a function that sets the payment method that the user has selected
function PaymentButton({text, setPaymentMethod}: {text: string, setPaymentMethod: (method: string) => void}) {
    const validateError = useAppSelector(getError)
    const handleClick = () => {
        //setPaymentMethod(text)
        if(validateError === '') {
            setPaymentMethod(text)
        } else alert(validateError)
    }
    return (
        <button
            className='text-black w-48 h-14 my-2 bg-purple-300 rounded-lg font-sans-fira'
            onClick={handleClick}
        >
            {text}
        </button>
    )
}

// PaymentWindow:
// This function returns a form for the user to enter their personal information and payment information.
// This function uses state to keep track of the user's personal information and payment selection.
// If the personal information and payment information is valid, the user can click the "Pay" button to complete the transaction.
// If the personal information and payment information is invalid, the user will be informed of the error and will be prompted to enter the correct information.
export function PaymentWindow() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <UserEntry/>
            <PaymentSwitch/>
        </div>
    )

}

function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
}

export function CompletePayment() {
    const [orderNo, setOrderNo] = useState<number>(0);
    const [newOrder, setNewOrder] = useState<OrderTypeInsert | null>(null);
    const stateOrder = useAppSelector(state => state.validate)
    const cart = useAppSelector(state => state.cartItems.cartItems)

    useEffect(() => {
        setOrderNo(generateOrderNumber());
        const currentTime: Date = new Date()
        setNewOrder({
            created_at: '',
            order_no: orderNo,
            order_total: 80,
            first_name: stateOrder.firstName,
            last_name: stateOrder.lastName,
            email: stateOrder.email,
            phone: stateOrder.phone,
            items: JSON.stringify(cart)
        });
    }, [cart, stateOrder, orderNo]);

    const clickHandler = async () => {
        console.log(newOrder)
        if (newOrder) {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newOrder)
            })
            const { body: bodyData, error: error } = await res.json()
            console.log(bodyData, error)
        }
    }
    return (
        <OrderNumberContext.Provider value={orderNo}>
            <div>
                <Link href="/complete" >
                    <button className='w-36 h-12 bg-pastel-coral rounded-lg text-sm' onClick={clickHandler}>Confirm Payment</button>
                </Link>
            </div>
        </OrderNumberContext.Provider>
    )
}
