import { fieldProps, getSignup, selectSignupField, setField } from '@/app/GlobalRedux/signupSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldName } from '@/app/GlobalRedux/signupSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { UserType } from '@/types';
import { Sign } from 'crypto';

interface SignupProps {
    name: string
}

function Signup(props: SignupProps) {
  return (
    <div className='w-full rounded-b-lg bg-white h-16'>
        <SignupField name='firstname'/>
        <SignupField name='lastname'/>
        {/* DCI number/ GEM ID/ pokemon Player ID / yugioh Konami ID*/}
        <GameIDField name={props.name} />
        <SubmitBtn/>
    </div>
  )
}

function SubmitBtn() {
  const signupData = useAppSelector(getSignup)
  return (
    <button 
      className='w-20 h-12 bg-green-500 p-0 mr-3 rounded-md text-xl font-sans-fira font-bold'
      onClick={()=> { 
        console.log(signupData)
        putter('api/users', signupData as UserType)
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
  alert(await res.json())
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
          value={ fieldValue }
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
