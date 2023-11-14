import { fieldProps, selectSignupField, setField } from '@/app/GlobalRedux/signupSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldName } from '@/app/GlobalRedux/signupSlice';
import { useAppDispatch } from '@/app/hooks';

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
    </div>
  )
}


function setSignupField() {
    // ChooseField()
    // state.field = field
}
function SignupField(props: SignupProps) {
    const dispatch = useAppDispatch()
    const fieldValue = useSelector(selectSignupField(props.name as FieldName))
    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => { 
      const payloadValues: fieldProps = { fieldName: props.name as FieldName, fieldValue: String(event.target.value)  } 
      dispatch(setField(payloadValues))
    }
    return (
        <input 
          type="text" 
          name={props.name} 
          id={props.name} 
          placeholder={props.name}
          value={ fieldValue }
          onChange={ handleChange }
          className="pl-2 mt-2 w-[14rem] mx-4 h-12 bg-teal-200 text-black focus:bg-teal-500 focus:text-white
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
