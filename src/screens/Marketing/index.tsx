import React,{useRef, useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Animated} from 'react-native'
import styled from '~/components'
import {redux, navigator} from 'lib'
import {animations} from 'config'
import View from './View'
import ServiceContent from 'services/Content'
import ServiceBlock from 'services/Block'
import ServiceUser from 'services/User'

function Marketing({navigation, theme})
{
  const [serviceContent] = useState(new ServiceContent())
  const [serviceBlock] = useState(new ServiceBlock())
  const [serviceUser] = useState(new ServiceUser())

  const scrollY = useRef(new Animated.Value(0)).current;

  const [data, setData] = useState(redux.get('marketing'))

  const [intro] = useState(redux.get('intro'))

  useEffect(() => {
    serviceContent.mounted()
    serviceBlock.mounted()
    serviceUser.mounted()
    return () => {
      serviceContent.unmounted()
      serviceBlock.unmounted()
      serviceUser.unmounted()
    }
  })

  useEffect(() =>
  {
    const unsubscribe = redux.subscribe( () =>
    {
      if(redux.is('navigator')) navigatorByRedux(navigation)
    })

    if(intro) navigator(`${intro}`)  // 'Login', 'Sinup'

    return () => unsubscribe()

  },[intro])

  var animations_ = animations.Marketing(scrollY)

  return (
    <View 
      serviceContent={serviceContent}
      serviceBlock={serviceBlock}
      serviceUser={serviceUser}
      animations={animations_}
      onScroll={Animated.event}
      theme={theme}
      data={data}
      />
  )
}

Marketing.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default styled(Marketing)



/**
 * Separar esto 
 */
function navigatorByRedux(navigation)
{
  if(typeof navigation.setOptions !== 'function') return

  try {
    
    let { route, params } = redux.get('navigator')
  
    if(route === 'goBack' && navigation?.canGoBack()) return navigation?.goBack()

    else if(route === 'toggleDrawer') return navigation?.toggleDrawer()
      
    else if(route === 'ContentInfo') return redux.push('content_info', params)

    else if(route === 'GoogleCast') return redux.push('google_cast', params)

    else if([
      'ContentDetail',
      'ContentSearch',
      'Search'
      ].indexOf(route) !== -1)
    {
      let screen
      switch(route){
        case 'ContentDetail':
          screen = 'screen_content_detail'
        break
        case 'ContentSearch':
          screen = 'screen_content_search'
        break
        case 'Search':
          screen = 'screen_search'
        break
      }

      current = redux.get(screen)
      current = current === 100 ? 0 : current
      current = current + 1

      redux.push(screen, current)

      navigation?.navigate(`${route}${current}`, params)
    }
    else if(route !== 'goBack') navigation?.navigate(`${route}`, params) 
  } catch (error) {
    console.log('Error: ', route)
  }
}