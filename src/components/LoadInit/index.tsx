import React,{ useState, useLayoutEffect, useEffect } from 'react'
import { Container, Indicator, Form, Logo, SendButton, Wave, Text, Input } from './styles'
import {withTheme} from 'styled-components/native'

function LoadInit({theme, load, onPress})
{
  return (
    <Container>
      <Logo source={theme.logo} />
      {(load===null)?<Indicator/>:null}
      <Text>{(load===null)?'Cargando...' : 'Error Auth'}</Text>
      <SendButton onPress={onPress} load={load}>
        <Wave>
          <Text load={load}>volver a intentar</Text>
        </Wave>
      </SendButton>
    </Container>
  )
} 

export default withTheme(LoadInit)