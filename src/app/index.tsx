import React,{useState, useEffect, useCallback} from 'react'
import 'react-native-gesture-handler'
import {LogBox} from 'react-native'
import Router from './routes'
import redux from 'services/redux'
import Notifications from '~/components/Notifications'
import GoogleCast from '~/components/GoogleCast'
import SliderIntro from '~/components/SliderIntro'
import LoadInit from '~/components/LoadInit'
import Loading from '~/components/Loading'
import fn from './functions'
import Theme from './Theme'
import store from './store'
import ignoreLogs from './ignoreLogs'
import {App} from './styles'

LogBox.ignoreLogs(ignoreLogs)

function Index()
{
  const [init, setInit] = useState(true)

  const [load, setLoad] = useState(null)

  const [intro, setIntro] = useState(false)
  
  useEffect(function()
  {
    redux.store(store)
  
    setInit(false)
  
    fn.onLoad(setLoad, setIntro)

    var time = 0
    function onPing()
    {
      time = setTimeout(async() => {
        await fn.PING()
        onPing()
      }
      , 900000) // 15min
    }

    onPing()

    return () => clearTimeout(time)

  },[])

  return (
    <Theme>
      <Notifications>
        <App.Container>
          {(load !== true)
            ? <LoadInit onPress={()=>fn.onLoad(setLoad, setIntro)} load={load}/>
            : (intro === true)
              ? <SliderIntro onAction={value=>fn.onAction(value, setIntro)}/>
              : <>
                  <GoogleCast /> 
                  <App.SafeAreaProvider>
                      <Router/>
                  </App.SafeAreaProvider>
                </>
          }
          <Loading load={load}/>
        </App.Container>
      </Notifications>
    </Theme>
  )
}

export default Index