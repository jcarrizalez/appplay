import React,{useRef, useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Animated} from 'react-native'
import styled from '~/components'
import {redux, navigator} from 'services'
import {animations} from 'config'
import View from './View'
import fn from './functions'

function Marketing({navigation, theme})
{
  const scrollY = useRef(new Animated.Value(0)).current;

  const [data, setData] = useState(redux.get('marketing'))

  const [intro] = useState(redux.get('intro'))

  useEffect(() =>
  {
    const unsubscribe = redux.subscribe( () =>
    {
      if(redux.is('navigator')) fn.navigatorByRedux(navigation)
    })

    if(intro) navigator(`${intro}`)  // 'Login', 'Sinup'

    return () => unsubscribe()

  },[intro])
    var animations_ = animations.Marketing(scrollY)

    console.log(animations_.activeOpacity)
  return (
    <View 
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