// This slice is used to validate the user input and display the error message if the input is invalid.
// It stores five states:
// firstName: string  - stores the first name of the user
// lastName: string  - stores the last name of the user
// email: string  - stores the email of the user
// phone: string  - stores the phone of the user
// error: string  - stores the error message to be displayed if the input is invalid
// It is possessed of the following actions:
// setFirstName: (state, action) => void  - validates the first name of the user and sets the error message if the input is invalid
// setLastName: (state, action) => void  - validates the last name of the user and sets the error message if the input is invalid
// setEmail: (state, action) => void  - validates the email of the user and sets the error message if the input is invalid
// setPhone: (state, action) => void  - validates the phone of the user and sets the error message if the input is invalid

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  error: '',
};

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

function validatePhone(phone: string) {
  const re = /^\d{10}$/
  return re.test(phone)
}

function validateName(name: string) {
  const re = /^[a-zA-Z]+$/
  return re.test(name)
}

const validateSlice = createSlice({
  name: 'validate',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
      if (!action.payload) { 
        state.error = 'First Name is required';
      } else if (!validateName(action.payload)) { 
        state.error = 'First Name is invalid';
      }
      else {
        state.error = '';
      }
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
      if (!action.payload) {
        state.error = 'Last Name is required';
      } else if (!validateName(action.payload)) { 
        state.error = 'Last Name is invalid';
      }
      else {
        state.error = '';
      }
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      if (!action.payload) {
        state.error = 'Email is required';
      } else if (!validateEmail(action.payload)) { 
        state.error = 'Email is invalid';
      }
      else {
        state.error = '';
      }
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
      if (!action.payload) {
        state.error = 'Phone is required';
      } else if (!validatePhone(action.payload)) { 
        state.error = 'Phone is invalid';
      }
      else {
        state.error = '';
      }
    },
  },
});

// getError is a selector that returns the error message
// It takes the state as an argument and returns the error message
export const getError = (state: any) => state.validate.error;

export const { setFirstName, setLastName, setEmail, setPhone } = validateSlice.actions;
