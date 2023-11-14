import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface signup {
  firstname: string,
  lastname: string,
  player_id: string,
}

const initialState: signup = {
  firstname: "iZatch",
  lastname: "Marts",
  player_id: ""
}

export interface fieldProps {
  fieldName: FieldName,
  fieldValue: string
}

export type FieldName = 'firstname' | 'lastname' | 'player_id'

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignup: (state, action: PayloadAction<signup>) => {
      const {firstname, lastname, player_id } = action.payload
      state.lastname = lastname
      state.firstname = firstname
      state.player_id = player_id
    },
    setField: (state, action: PayloadAction<fieldProps>) => {
      const {fieldName, fieldValue} = action.payload
      state[fieldName] = fieldValue
    }
  }
})

export const getSignup = (state: RootState) => {
      return state.signup
    }

export const selectSignupField = (fieldName: FieldName) =>
  createSelector (
    [(state: RootState) => state.signup],
    (state) => state[fieldName]
)

export const { setSignup, setField} = signupSlice.actions
export default signupSlice.reducer
