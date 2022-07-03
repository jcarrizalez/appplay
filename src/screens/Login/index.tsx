import React, { useState, useEffect, useCallback } from 'react'
import {Keyboard} from 'react-native'
import PropTypes from 'prop-types'
import styled from '~/components';
import View from './View'
import ServiceUser from 'services/User'

function Login({navigation, theme})
{
  const [serviceUser] = useState(new ServiceUser())
  
  const [usertest] = useState(theme.company.develop 
    ? theme.company.usertest 
    : {}
  )

  const [state, setState] = useState({
      username: undefined,
      password: undefined,
      visibility: true,
      //develop: theme.company.develop,
      develop: false,
      ...usertest,
    })

  const onCloseKeyboard = useCallback( () => Keyboard.dismiss() )

  const onState = useCallback(function(type: string, value: string){

    if(type === `visibility`){

      if(state.develop) return serviceUser.toast(`No habilitado para mostrar en desarrollo`)
    }
    else{
      state = {...state, errorUsername: false, errorPassword: false, errorAll: false}
    }

    setState({...state, [type]: value})

  },[state])

  const onLogin = useCallback(async function(data){

    state.errorUsername = (state.username.indexOf('@')=== -1 || state.username.length<=5)
    
    state.errorPassword = (state.password.length<=3)

    if(state.errorPassword || state.errorUsername) return setState(state)

    onCloseKeyboard()

    let response = await serviceUser.login(state.username, state.password)

    if(!serviceUser.isMounted()) return

    if(!response){
      state.errorUsername = true
      state.errorPassword = true
      state.errorAll = true
      return setState(state)
    }
    
    return ((response.profiles?.length??null) === 1)
      ? serviceUser.goBack()
      : navigation?.replace(`ProfileList`, response)
  },[state])


  useEffect(() => {
    serviceUser.mounted()
    return () => serviceUser.unmounted()
  },[])

  return (
    <View 
      s={state} 
      onState={onState}
      onLogin={onLogin}
      onCloseKeyboard={onCloseKeyboard} 
      />
  )
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default styled(Login)