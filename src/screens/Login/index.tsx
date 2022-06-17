import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '~/components';
import View from './View'
import fn, {load} from './functions'

function Login({navigation, theme})
{
  const [usertest] = useState(theme.company.develop 
    ? theme.company.usertest 
    : {}
  )

  const [s, setState] = useState({
      username: undefined,
      password: undefined,
      visibility: true,
      //develop: theme.company.develop,
      develop: false,
      ...usertest,
    })

  const [isM, setMounted] = useState(load.onMounted({
    state:s,
    navigation,
    setState,
  }), [s])

  useEffect(() => {
    return () => setMounted(load.onUnMounted())
  },[])

  return (
    <View 
      s={s} 
      onState={fn.onState}
      onLogin={fn.onLogin}
      onCloseKeyboard={fn.onCloseKeyboard} 
      />
  )
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default styled(Login)