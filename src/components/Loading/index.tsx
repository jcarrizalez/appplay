import React,{useState, useEffect} from 'react'
import {Container, Indicator} from './styles'
import {redux} from '~/services'
import {withTheme} from 'styled-components/native'
import Pulse from 'react-native-pulse'

export default function Loading({theme, load})
{
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const unsubscribe = redux.subscribe( () => redux.is('loading')
      ? setLoading(redux.get('loading'))
      : null
    )

    return () => unsubscribe()
  },[]);

  if(!load || !loading) return null

  return (
    <Container>
      <Pulse color={theme.color.lightGrey} numPulses={3} diameter={700} speed={10} duration={2000} pulseStyle={{position:'absolute', marginLeft:0, marginTop:0}}/>
      <Indicator/>
    </Container>
  )
}


export default withTheme(Loading)