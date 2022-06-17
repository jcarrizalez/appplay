import React,{ useState, useEffect } from 'react'
import { Container, Indicator } from './styles'
import { redux } from '~/services'
import {withTheme} from 'styled-components/native'

export default function Loading({load})
{
  const [loading, setLoading ] = useState(false)

  useEffect(() => {

    const unsubscribe = redux.subscribe( () => {

      if(redux.is('loading')){

        setLoading(redux.get('loading'))
      }
    });
    return () => unsubscribe()
  },[]);

  if(!load || !loading) return null

  return (
    <Container>
      <Indicator/>
    </Container>
  )
}


export default withTheme(Loading)