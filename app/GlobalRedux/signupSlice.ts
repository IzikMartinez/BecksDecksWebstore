import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserType } from "@/types";


export type signupType = {
  player_id: string | null,
  player_firstname: string | null,
  player_lastname: string | null,
  event_id?: string
}

const initialState: signupType = {
  player_firstname: "",
  player_lastname: "",
  player_id: "",
  event_id: ""
}

export interface fieldProps {
  fieldName: FieldName,
  fieldValue: string
}

export type FieldName = 'player_firstname' | 'player_lastname' | 'player_id' | 'event_id'

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignup: (state, action: PayloadAction<signupType>) => {
      const {player_firstname, player_lastname, player_id, event_id } = action.payload
      state.player_lastname = player_lastname
      state.player_firstname = player_firstname
      state.player_id = player_id
      state.event_id = event_id
      console.log(`Passed ID: ${event_id},\n State ID: ${Object.values(state)}`)
    },
    setField: (state, action: PayloadAction<fieldProps>) => {
      const {fieldName, fieldValue} = action.payload
      state[fieldName] = fieldValue
    }, logFields: (state) => { console.log(state) }
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

export const { setSignup, setField, logFields} = signupSlice.actions
export default signupSlice.reducer
