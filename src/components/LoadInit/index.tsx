import React,{ useState, useLayoutEffect, useEffect } from 'react'
import { Container, Indicator, Form, Logo, SendButton, Wave, Text, Input } from './styles'
import {withTheme} from 'styled-components/native'
import Pulse from 'react-native-pulse'

function LoadInit({theme, load, onPress})
{
  return (
    <Container>
      <Pulse color={theme.color.lightGrey} numPulses={3} diameter={600} speed={10} duration={2000} pulseStyle={{position:'absolute', marginLeft:-5, marginTop:-51}}/>
    {/*
      */}
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