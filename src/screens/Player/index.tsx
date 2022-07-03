import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { useDrawerStatus } from '@react-navigation/drawer';
import Orientation from "react-native-orientation-locker"
import PropTypes from 'prop-types'
import styled, {MediaPlayer} from '~/components'
import { Container, Video, Controls, TextTrackType } from './styles'
import {redux} from 'lib'
//import _ from 'lodash'

var s

var CONFIG = {
}

function Player({ navigation, route, theme })
{
  const ref = useRef()

  const [init, setInit] = useState(false)

  const isDrawerOpen = useDrawerStatus() === 'open'

  const [data, setData] = useState(route.params || {})

  const [player] = useState(data[theme.device.ios? 'ios' : 'android'])
  //const [player] = useState(data['ios'])

  const [selectedAudioTrack, setSelectedAudioTrack] = useState(player.selectedAudioTrack)
  /*
    {
      type: "language",
      value: 'es'
    }
  */


  const [selectedTextTrack, setSelectedTextTrack] = useState(player.selectedTextTrack)

  //console.log('selectedAudioTrack)
  //console.log('selectedTextTrack',selectedTextTrack)
  /*
    {
      type: 'index',
      value: 0
    }
  */

  const [textTracks, setTextTracks] = useState(player.textTracks)

  var [state, setState] = useState({
    time:data.progress??data.time_start,
    duration: 0,
    currentTime: data.progress??data.time_start,
    error: false,
    paused: false,
    loading: false,
  })
  s = state

  useEffect(() => {

    redux.push('drawer', 'player')
    
    const unsubscribe = redux.subscribe( () =>
    {
      if(!redux.is('event_player')) return 

      let {type, value} = redux.get('event_player')

      switch(type){
        case 'selectedAudioTrack':
          return setSelectedAudioTrack(value)
        case 'selectedTextTrack':
          return setSelectedTextTrack(value)
      }
    });

    return () => {
      unsubscribe()
      redux.push('drawer', 'menu')
    }
  },[])

  useEffect(() =>
  {
    if(init) ref.current.seek(s.currentTime)
    //if(init) ref.current.seek(725)
  }, [init]);

  /*
  useEffect(() =>
  {
    setState({...s, paused:isDrawerOpen})
  
  }, [isDrawerOpen]);
*/
  useEffect(() =>
  {
    CONFIG.isLocked = Orientation.isLocked()

    if(typeof navigation.setOptions !== 'function') return

    const unsubscribe = navigation.addListener("focus", () => {
      
      Orientation.getAutoRotateState(function(state){

        CONFIG.isRotate = state

        Orientation.getOrientation(function(orientation){

          CONFIG.orientation = orientation

          /**/
          Orientation.lockToLandscapeLeft();
          /**/
          setInit(true)
        })
      })
    });
    return () => 
    {
      unsubscribe()
      
      /**/
      switch(CONFIG.orientation) {
        case 'PORTRAIT':
        case 'UNKNOWN':
          Orientation.lockToPortrait()
          break;
        case 'LANDSCAPE-LEFT':
          Orientation.lockToLandscapeLeft()
          break;
        case 'LANDSCAPE-RIGHT':
          Orientation.lockToLandscapeRight()
          break;
      }

      if(CONFIG.isRotate === true){
        Orientation.unlockAllOrientations();
      }
      /**/
    }
    
  }, [navigation]);
  /*
  useLayoutEffect(() => {
    if(typeof navigation.setOptions !== 'function') return

    navigation.setOptions({
      headerShown: false,
    })
  
  },[navigation]);
  */
  function onLoadStart(){
    console.log('onLoadStart')
    setState({...s, loading:true, error: false })
  } 
  function onProgress({currentTime}){

    setState({...s, loading: false, error: false, currentTime, time: currentTime })
  }
  function onEnd() {
    setState({...s, loading: false})
  }
  function onError(err){
    console.log('error', err)
    setState({...s, loading:false, error:true})
  }
  function onLoad({duration}){
    console.log('onLoad')
    redux.push('player_controls', {
      ...data,
      ...player,
      textTracks,
      selectedTextTrack,
      selectedAudioTrack,
    })
    setState({...s, error: false, loading: false, duration: duration || s.duration})
  }
  function onPause(){
    setState({...s, paused:!s.paused})
  }
  function onBack(){
    navigation?.goBack()
  } 
  function onControls(){
    navigation?.toggleDrawer()
  }
  function onSlidingStart(data){
    setState({...s, paused:true})
  }
  function onValueChange(value){
    //setState({...s, time: value})
  }
  function onSlidingComplete(position){
    ref.current.seek(position)
    setState({...s, paused: false, loading: true,time: position, currentTime: position})
  }

  if(!init) return <Container />

  return (
    <Container>

      <Video
        ref={ref}
        paused={s.paused}
        //paused={true}
        resizeMode='stretch' // 'contain' 'cover' 'stretch'
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onEnd={onEnd}
        onError={onError}
        onLoad={onLoad}
        source={player.source}
        poster={data.poster}
        rate={1}
        selectedTextTrack={selectedTextTrack}
        textTracks={textTracks}
        selectedAudioTrack={selectedAudioTrack}
      />

      <Controls
        uuid={data.uuid}
        state={s}
        error={s.error}
        //time={s.time}
        loading={s.loading}
        duration={s.duration}
        paused={s.paused}
        currentPosition={s.currentTime}
        title={data.title}
        onBack={onBack}
        onPause={onPause}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        //onValueChange={onValueChange}
        onControls={onControls}
        isDrawerOpen={isDrawerOpen}
      />
    </Container>
  );
}
Player.propTypes = {
  navigation: PropTypes.object,
}

export default styled(Player)