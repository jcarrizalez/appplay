import React,{useState, useEffect} from 'react'
import {Platform, useColorScheme} from 'react-native'
import redux from 'services/redux'
import storage from 'services/storage'
import getConfig from 'config'
import {ThemeProvider} from 'styled-components/native'
import store from './store'
import {App} from './styles'

function Theme({dark, children})
{
  const [config, setConfig] = useState(null)

  const [session, setSession] = useState({
    info_user: {},
    history_login: null
  })

  const [device] = useState({
    platform : Platform.OS,
    ios: Platform.OS === 'ios',
    isDark: useColorScheme() === 'dark',
    version: Platform.Version,
    isPad: Platform.isPad,
    isTV: Platform.isTV,
    isTVOS: Platform.isTVOS,
  })

  useEffect(() =>
  {
    async function setTheme(value){

      if(value) await storage.push('theme', value)

      setConfig(getConfig(value))
    }

    const unsubscribe = redux.subscribe( function(){

      if(redux.is('theme')) setTheme(redux.get('theme'))
      else if(redux.is('info_user')) setSession({
        ...session,
        info_user: redux.get('info_user')
      })
        else if(redux.is('history_login')) setSession({
        ...session,
        history_login: redux.get('history_login')
      })
    })

    return () => unsubscribe()
  },[session])

  const props = {
    device,
    session,
    ...config,
  }

  return (
    <ThemeProvider theme={props}>
      <App.StatusBar isDark={device.isDark}/>
      {config
        ? children
        : <App.Default isDark={device.isDark}/>
      }
    </ThemeProvider>
  )
}

export default Theme