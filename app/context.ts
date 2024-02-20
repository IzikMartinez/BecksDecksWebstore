import {createContext} from "react";

export const FormValidityContext =  createContext({
    firstNameValid: true,
    lastNameValid: true,
    emailValid: true,
    phoneValid: true,
    setFirstNameValid: (valid: boolean) => {},
    setLastNameValid: (valid: boolean) => {},
    setEmailValid: (valid: boolean) => {},
    setPhoneValid: (valid: boolean) => {},
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    setFirstName: (value: string) => {},
    setLastName: (value: string) => {},
    setEmail: (value: string) => {},
    setPhone: (value: string) => {}

})
