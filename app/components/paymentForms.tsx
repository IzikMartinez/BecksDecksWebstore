// ShippingOptions:
// This function returns the shipping options for the user to choose from.
// The user can choose to pick up the item in store, or have it shipped to them.
// As of now, only the "Pickup in store" option is available. UPS and USPS shipping options will be added in the future.
// This function should take an array of shipping options as an argument, and return a list of radio buttons for the user to choose from.
// set pick up in store to be a radio that is checked by default and USPS and UPS to be disabled
import styles from "app/styles/userformStyles.module.css";
import {useDispatch} from "react-redux";
import React, {useEffect, useState, useContext} from "react";
import { Checkout } from "@/app/components/Checkout"
import { useAppSelector} from "@/app/hooks";
import { OrderTypeInsert } from "@/types";
import {FormValidityContext} from "@/app/context";

export function ShippingOptions() {
    return (
        <div className='flex flex-col mx-8'>
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
    const {
        firstNameValid, lastNameValid, emailValid, phoneValid,
        setFirstNameValid, setLastNameValid, setEmailValid, setPhoneValid,
        firstName, lastName, email, phone,
        setFirstName, setLastName, setEmail, setPhone,
    } = useContext(FormValidityContext);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Regex for validating names, email and phone
        const nameRegex = /^[A-Za-z]+$/
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.)]+.[A-Z]{2,}$/i
        const phoneRegex = /^\d{3}\d{7}/

        // create isValid: boolean and assign a value to it based on the data type
        let isValid = false
        switch (dataType) {
            case "firstName":
            case "lastName":
                isValid = nameRegex.test(value)
                break;
            case "email":
                isValid = emailRegex.test(value)
                break;
            case "phone":
                isValid = phoneRegex.test(value)
        }

        // Update state via context
        switch (dataType) {
            case "firstName":
                setFirstName(value);
                setFirstNameValid(isValid);
                break;
            case "lastName":
                setLastName(value);
                setLastNameValid(isValid);
                break;
            case "email":
                setEmail(value);
                setEmailValid(isValid);
                break;
            case "phone":
                setPhone(value);
                setPhoneValid(isValid);
                break;
        }
    }

    const getIsValid = (): boolean => {
        switch (dataType) {
            case "firstName": return firstNameValid
            case "lastName": return lastNameValid
            case "email": return emailValid
            case "phone": return  phoneValid
            default: return true
        }
    }

    const hasError = getIsValid() ? '' : styles.inputError; // use your error CSS class// add your error CSS class
    return (
        <div className='flex flex-col'>
            <input type={dataType === 'email' ? 'email' : dataType === 'phone' ? 'tel': 'text'}
                   placeholder={text}
                   className={`${styles.userform} ${hasError}`}
                   onChange={dataType === 'phone' ? undefined : handleChange}/>
            {!getIsValid() && <div className={styles.errorText}> This field cannot be empty! </div>} {/*show error message*/}
        </div>
    )
}



// UserEntry:
// This function returns a form for the user to enter their first name, last name, and email.
// The user can also enter their phone number, but this is optional.
// This function accepts an argument:
// setIsValid: a function that sets the state of whether the user's personal information is valid, and the fields that are invalid
function UserEntry() {
    // Define state variables for each form field
    // Component now accepts an extra prop for setting validity
    return (
        <div>
            <UserForm text='First Name' dataType='firstName'/>
            <UserForm text='Last Name' dataType='lastName'/>
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
    const {firstNameValid, lastNameValid, emailValid, phoneValid } = useContext(FormValidityContext)
    const handleClick = () => {
        //setPaymentMethod(text)
        if(firstNameValid && lastNameValid && emailValid) {
            setPaymentMethod(text)
        } else alert('Please make sure to enter your first and last names, and an email address')
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

import {createNewOrder} from "@/app/utils/CreateNewOrder";
import {clearCart, selectTotalCartPrice, toggleVisible} from "@/app/GlobalRedux/cartSlice";
import {useRouter} from "next/navigation";

export function CompletePayment() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [newOrder, setNewOrder] = useState<OrderTypeInsert | null>(null);
    const {firstName, lastName, email, phone } = useContext(FormValidityContext)
    const cart = useAppSelector(state => state.cartItems.cartItems);
    const orderTotal = useAppSelector(selectTotalCartPrice)

    useEffect(() => {
        setNewOrder(createNewOrder({
            orderTotal: orderTotal,
            stateOrder: {firstName, lastName, email, phone},
            cart: cart
        }));
    }, []);
    const submitOrder = async (order: OrderTypeInsert) => {
        console.log(`Calling from submit order: ${order.order_no}`)
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(order)
        });
        const {body: bodyData, error} = await response.json();
        console.log(bodyData, error);
        return {
            status: response.status,
            orderNo: bodyData.order_no
        }
    }

    const clickHandler = async () => {
        if (newOrder) {
            const {status, orderNo} = await submitOrder(newOrder);
            if(status === 200) {
                dispatch(clearCart())
                dispatch(toggleVisible(false))
                router.push(`/complete/${orderNo}`);
            }
            else alert("The order system is not working right now: Please try again later")
        } else {
            alert(`Failed to create order data: ${newOrder}`)
        }
    }
    return (
        <div>
            <button className='w-36 h-12 bg-pastel-coral rounded-lg text-sm' onClick={clickHandler}>Confirm
                Payment
            </button>
        </div>
    )
}
