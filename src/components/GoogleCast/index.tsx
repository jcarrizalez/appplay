import React, {useRef, useEffect, useState, useCallback} from 'react'
import Icon from '~/components/Icon'
import {redux, toast, contents, logger} from 'services'
import {Sheet} from './styles'
import View from './View'
import fn from '../ContentInfo/functions'
import {withTheme} from 'styled-components/native'
/*
import GoogleCast, { 
  CastButton, useCastState, useDevices, 
  useCastChannel, useRemoteMediaClient, 
  useMediaStatus, useStreamPosition,
  CastContext, useCastSession
} from 'react-native-google-cast'
*/
function Client({theme})
{
  return null
}

/*
function Client({theme})
{
  const [client, setClient] = useState(useRemoteMediaClient())

  const onShowCastDialog = useCallback(async () => await CastContext.showCastDialog(),[])

  const sessionManager = GoogleCast.getSessionManager()

  const textTrackStyle = {
    foregroundColor: '#FF0000',
  }

  //const castSession = useCastSession()

  //const discoveryManager = GoogleCast.getDiscoveryManager()

  async function onClient(type, params = {}){

    if(client === null) return

    try {

      switch(type){
        case `load`:
          return await client.loadMedia(params)

        case `subtitle`:
          return await client.setActiveTrackIds(params)

        case `subtitle-color`:
          return await client.setTextTrackStyle(textTrackStyle)

        case `muted`:
          return await client.setStreamMuted(params)

        case `play`:
          return await client.play()
        
        case `pause`:
          return await client.pause()
        
        case `stop`:
          return await client.stop()
        
        case `set-position`:
          return await client.seek({
            position:params,
            //infinite:false,
          })
        
        case `get-position`:
          return await client.getStreamPosition()
        
        case `volume`:
          return await client.setStreamVolume(params)
      }
    } catch (error) {
      return logger.error('mappers/cast')
    }
  }

  async function onSession(type, params){

    if(sessionManager === null) return

    switch(type){
      case `conect`:
        return await sessionManager.startSession(params)
      case `disconect`:
        return await sessionManager.endCurrentSession()
    }
  }
  
  useEffect(() => {
    
    const listener = sessionManager.onSessionStarted((session) => {
      
      if(session.client) setClient(session.client)
    })

    return () => listener.remove()

  },[])

  return (
    <GoogleCastView 
      theme={theme}
      client={client}
      onClient={onClient}
      onSession={onSession}
      onShowCastDialog={onShowCastDialog}
      />
  )
}

var ControlMounted = false
function Control({data, onClient, device, duration, currentPosition, onSessionManager})
{
  const [slider, setSlider] = useState(false)

  const [position, setPosition] = useState(currentPosition)

  const [tmpPosition, setTmpPosition] = useState(0)

  const [pause, setPause] = useState(false)
  
  const onStop = useCallback( () => {
    onClient(`stop`)
  },[])

  const onPlay = useCallback( (value) => {

    onClient(pause? `pause` : `play`)
    setPause(!pause)
  },[pause])

  const onSlidingComplete = useCallback( (value) => {
    onClient(`set-position`, value)
    setSlider(false)
  },[])
  
  const onValueChange = useCallback( value => setTmpPosition(value),[])

  const onSlidingStart = useCallback( () => setSlider(true),[])

  useEffect(function(){

    ControlMounted = true
    var time = 0
    function onTime()
    {
      time = setTimeout(async() => {

        let response = await onClient(`get-position`)
        if(!ControlMounted) return
        setPosition(response)
        onTime()
      }
      , 1000)
    }

    onTime()

    return () => {
      ControlMounted = false
      clearTimeout(time)
    }
  
  },[])

  const time = slider? tmpPosition : (position || 0)

  return (
    <View.Content 
      data={data}
      onClient={onClient}
      device={device}
      position={time}
      duration={duration}
      pause={pause}
      onStop={onStop} 
      onPlay={onPlay}
      onSlidingStart={onSlidingStart}
      onSessionManager={onSessionManager}
      onValueChange={onValueChange}
      onSlidingComplete={onSlidingComplete}
      />
 )
}


function GoogleCastView({theme, onSession, onClient, onShowCastDialog})
{
  const ref = useRef()

  const castState = useCastState()

  const devices = useDevices()

  const [device, setDevice] = useState(redux.get('google_cast'))

  const [sheet, setSheet] = useState(false)

  const [data, setData] = useState({})

  const [currentPosition, setPosition] = useState(data.progress??0)

  
  function onSessionManager(type, item){

    if(type === `conect` && device.deviceId === undefined) onSession(type, item.deviceId)

    else if(type === `disconect`){
      onSession(type)
      if(data.uuid) ref.current.close()
      setData({})
    }
    setDevice(item)
  }
  
  useEffect(function(){

    const unsubscribe = redux.subscribe(function(){
    
      if(!redux.is('google_cast')) return

      let response = redux.get('google_cast')

      if(response.uuid){

        setData(response)

        setTimeout(() => onClient(`load`, response.loadMedia), 1000)
      }
       ref.current.open()
    })
    //ref.current.open()
    return () => unsubscribe()
  },[])

  var cant_devices = devices.length??0

  return(
    <Sheet.Container 
      ref={ref} 
      onClose={()=>setSheet(false)}
      onOpen={()=>setSheet(true)}
      height={cant_devices>0 ?((data.uuid? 520 : 130) + (cant_devices * 40)) :140}
      >
      {(sheet && data.uuid)
        ? <Control
            data={data}
            device={device}
            duration={data.loadMedia.mediaInfo.streamDuration}
            onClient={onClient}
            currentPosition={currentPosition}
            onSessionManager={onSessionManager}
          />
        : null
      }
      <Sheet.ViewB>
        {data.uuid
          ? null
          :  <View.Devices 
              castState={castState}
              onSessionManager={onSessionManager}
              devices={devices.map(item => {
                item.active = item.deviceId === device.deviceId
                return item
              })}
              theme={theme}
              height_devices={cant_devices>0 ?(40 + (cant_devices * 40)) :40}
              cant_devices={cant_devices}
              />
          }
        <Sheet.FooterContainer onPress={onShowCastDialog}>
          <Sheet.FooterLine />
          <Sheet.FooterLeft />
          <Sheet.FooterCenter />
          <Sheet.FooterRight />
        </Sheet.FooterContainer>
      
        <Sheet.CloseContainer onPress={()=>ref.current.close()}>
          <Sheet.CloseIcon />
        </Sheet.CloseContainer>
      </Sheet.ViewB>
    </Sheet.Container>
  )
}
*/

export default withTheme(Client)




















  /*

  const getCastDevice = async function(){

    if(typeof castSession !== 'function') return

    let response = await castSession.getCastDevice()
    
    setDevice(response??{})
  }
  useEffect(function(){

    switch(castState){
      case `connected`:
        getCastDevice()
        break
      case `notConnected`:
        setData({})
        break
    }
  },[castState, devices])
  const onCast = useCallback(async function(data){

    console.log(`client`,client)
    console.log(`loadMedia`,data.loadMedia.mediaInfo.mediaTracks)
    if (client === null) return 

    onClient(data.loadMedia)

    //const cccccc = client.onMediaProgressUpdated((streamPosition) => {
    //  console.log(`streamPosition`,streamPosition)
    //}, 10)

    //client.setActiveTrackIds([2, 3])

    setData(data)
    return
    
   },[client, castState])

  useEffect(function(){
    //discoveryManager.startDiscovery()
    //GoogleCast.getDiscoverManager().startDiscovery()
    const subscription = discoveryManager.onDevicesUpdated(devices => {
      console.log(`devices`, devices)
    })

    return () => {
      subscription?.remove()
    }

  },[])

  useEffect(function(){
    
    if(castState === `connected`) getCastDevice()
    else if(castState === `notConnected`) setData({})

    const subscription = CastContext.onCastStateChanged(castState_ => {

      console.log(`castState_`, castState_)
      if(castState_ === `connected`) getCastDevice()
      else if(castState_ === `notConnected`) setData({})

      setCastState(castState_)
    })

    return () => {
      console.log(`XXxxxxxxxxxxxxxxXX`)
      subscription?.remove()
    }

  },[])
*/
  
/*

   //console.log(`castSession`,castSession)
    //console.log(`getCastState`,await castSession.getCastDevice())
    //console.log(`getSessionManager`,await CastContext.getSessionManager())
    //console.log(`getDiscoveryManager`,await CastContext.getDiscoveryManager())
    //con
        //
      //await client.playbackRate(2)}>rate 0.5

    //console.log(`castSession`,castSession)
    //console.log(`getCastState`,await castSession.getCastDevice())
    //console.log(`getSessionManager`,await CastContext.getSessionManager())
    //console.log(`getDiscoveryManager`,await CastContext.getDiscoveryManager())
    //console.log(`showIntroductoryOverlay`,await CastContext.showIntroductoryOverlay())





  LOG  notConnected
 LOG  connecting
 LOG  connected

  useEffect(() => {

    async function current(){
      let data 
      //data = await sessionManager.getCurrentCastSession()
      //console.log('getCurrentCastSession',data)

      //data = await sessionManager.onSessionResumed()
      //console.log('onSessionResumed',data)

      //console.log('castSession',castSession)

      //data = await castSession.getApplicationMetadata()
      //console.log('getApplicationMetadata',data)
      //data = await castSession.getApplicationStatus()
      //console.log('getApplicationStatus',data)
      //data = await castSession.getCastDevice()
      //console.log('getCastDevice',data)
      //data = await castSession.getClient()
      //console.log('getClient',data)
      //data = await castSession.getStandbyState()
      //console.log('getStandbyState',data)
      //data = await castSession.getVolume()
      //console.log('getVolume',data)
      //data = await castSession.isMute()
      //console.log('isMute',data)
    }
    const subscription = castSession.onActiveInputStateChanged(state => {
      getCastDevice()
    })

    return () => subscription.remove()

    //const xxxxxxx = client.onMediaStatusUpdated((mediaStatus) => {

    //})
    
  },[])
  const devices_filter =[]  
  devices.forEach(item => {
    if(!devices_filter.find(row => 
      //row.deviceId === item.deviceId && 
      row.friendlyName === item.friendlyName && 
      row.modelName === item.modelName && 
      row.deviceVersion === item.deviceVersion
      )){
      devices_filter.push(item)
    }   
  })
  console.log(devices_filter)
   
  const devices2 = [
    {deviceId:1, friendlyName: 'TELEVISOR', modelName:`Nexus Player`},
    {deviceId:2, friendlyName: 'Cuarto', modelName:`Chromecast`},
    {deviceId:3, friendlyName: 'ANDROID TV'},
  ]
  */
