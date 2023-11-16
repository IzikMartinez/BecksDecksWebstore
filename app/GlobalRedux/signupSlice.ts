import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserType } from "@/types";


const initialState: UserType = {
  player_firstname: "",
  player_lastname: "",
  player_id: ""
}

export interface fieldProps {
  fieldName: FieldName,
  fieldValue: string
}

export type FieldName = 'player_firstname' | 'player_lastname' | 'player_id'

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignup: (state, action: PayloadAction<UserType>) => {
      const {player_firstname, player_lastname, player_id } = action.payload
      state.player_lastname = player_lastname
      state.player_firstname = player_firstname
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
