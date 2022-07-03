import React, {useState, useEffect } from 'react'
import styled, {DrawerMenu, DrawerPlayer } from '~/components'
import {redux} from 'lib'

function Drawer({theme})
{
  const [drawer, setDrawer ] = useState('menu')
  
  useEffect(() =>
  {
    const unsubscribe = redux.subscribe( () => {

      if(!redux.is('drawer')) return
      
      setDrawer(redux.get('drawer')) 
    })

    return () => unsubscribe()
  },[])

  switch(drawer)
  {
    case 'player':
      return <DrawerPlayer theme={theme}/>
    case 'menu':
      return <DrawerMenu theme={theme}/>
    default:
      return null
  }
}
export default styled(Drawer)
