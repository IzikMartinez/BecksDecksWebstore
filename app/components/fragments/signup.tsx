import { fieldProps, getSignup, logFields, selectSignupField, setField, setSignup, signupType } from '@/app/GlobalRedux/signupSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldName } from '@/app/GlobalRedux/signupSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { EntrantType, UserType } from '@/types';
import { addToCart, cartItem } from '@/app/GlobalRedux/cartSlice';

interface SignupProps {
    name: string,
    event_id?: string
}

function Signup(props: SignupProps) {
  return (
    <div className='w-full rounded-b-lg bg-white h-16'>
        <SignupField name='firstname'/>
        <SignupField name='lastname'/>
        <GameIDField name={props.name} />
        <SubmitBtn event_id={props.event_id!}/>
    </div>
  )
}

interface SubmitProps { event_id: string }
function SubmitBtn(props: SubmitProps) {
  const signupData = useAppSelector(getSignup)
  const dispatch = useDispatch()
  return (
    <button 
      className='w-20 h-12 bg-green-500 p-0 mr-3 rounded-md text-xl font-sans-fira font-bold'
      onClick={()=> { 
        const newSignup: signupType = {
          player_id: signupData.player_id,
          player_firstname: signupData.player_firstname,
          player_lastname: signupData.player_lastname,
          event_id: props.event_id
        }
        dispatch(setSignup(newSignup))
        //poster('api/entrants', signupData as UserType, props.event_id)
        const newCartItem: cartItem = {
          id: signupData.player_id!,
          name: "Event signup",
          price: 10,
          quantity: 1
        }
        dispatch(addToCart(newCartItem))
      }}
    >
    Submit</button>
  )
}

const putter = async (url: string, newUser: UserType) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newUser)
  })
}
const poster = async (url: string, newUser: UserType, event_id: string) => {
  await putter('api/users', newUser)
  const newEntrant: EntrantType = {
    event_id: event_id,
    player_id: newUser.player_id!
  }
  const eventRes = await fetch(url, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(newEntrant)
  })
}


const GameIDFieldHelper = (props: SignupProps) => {
   switch(props.name) {
    case 'firstname': return 'player_firstname';
    case 'lastname': return 'player_lastname';
    default: return 'player_id';
   }
}

function SignupField(props: SignupProps) {
    const dispatch = useAppDispatch()
    const fieldName = GameIDFieldHelper(props)
    const fieldValue = useSelector(selectSignupField(fieldName as FieldName))
    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => { 
      const payloadValues: fieldProps = { fieldName: fieldName as FieldName, fieldValue: String(event.target.value)  } 
      dispatch(setField(payloadValues))
    }
    return (
        <input 
          type="text" 
          name={fieldName} 
          id={fieldName} 
          placeholder={props.name}
          value={ fieldValue! }
          onChange={ handleChange }
          className="pl-2 mt-2 w-[10rem] mx-4 h-12 bg-teal-200 text-black focus:bg-teal-500 focus:text-white
            rounded-tl-none rounded-br-xl focus:rounded-tl-md focus:rounded-br-none transition-all ease-linear duration-200" 
        />
    )
}

function GameIDField(props: SignupProps) {
  const [IDTitle, setIDTitle] = useState<string>('WPN')
  useEffect(()=> {
    switch (props.name) {
      case 'magic':
        setIDTitle('WPN')
        break;
      case 'fab':
        setIDTitle('GEM ID')
        break;
      case 'pokemon':
        setIDTitle('Player ID');
        break;
      case 'yugioh':
        setIDTitle('Konami ID')
        break;
      default:
        break;
    }
  },[props.name])
  return <SignupField name={IDTitle}/>
}
export default Signup
