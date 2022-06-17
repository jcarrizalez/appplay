import React, {useRef, useEffect, useState} from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from '~/components/Icon'
import Buttom from '~/components/Buttom'
import { redux } from '~/services'
import { CONTENT_DETAIL } from '~/endpoints'
import {withTheme} from 'styled-components/native'

import styles, { 
  Image,
  BorderImage,
  Title,
  AnioRating,
  Duration,
  Description,
  Imdb,
  TouchClose,
  Footer,
  LineFooter,
  LineHeader,
  TextFooter,
  Container,
  Touch,
} from './styles'

import { Text, TouchableOpacity, View } from 'react-native'

//import GoogleCast, { CastButton } from 'react-native-google-cast'
import GoogleCast, { 
  CastButton, useCastState, useDevices, 
  useCastChannel, useRemoteMediaClient, 
  useMediaStatus, useStreamPosition,
  CastContext
} from 'react-native-google-cast'


var currentid = null
    
function GoogleCastView()
{
  const ref = useRef();

  const castState = useCastState()

  const devices = useDevices()

  const client = useRemoteMediaClient()

  const sessionManager = GoogleCast.getSessionManager()

  //const mediaStatus = useMediaStatus()
  // may be `null` if there's no current media
  //if (mediaStatus) {
    // ...
  //}

  //const channel = useCastChannel('urn:x-cast:com.example.custom')

  // may be `null` if session is not connected
  //if (channel) {
    // ...
  //}

  //const streamPosition = useStreamPosition()

  // may be `null` if there's no current media
  //if (streamPosition) {
    // ...
  //}

  /*
   const englishSubtitle = {
    id: 1, // assign a unique numeric ID
    type: 'text',
    subtype: 'subtitles',
    name: 'English Subtitle',
    contentId: 'https://some-url/caption_en.vtt',
    language: 'en-US',
  }

  const frenchSubtitle = {
    id: 2,
    type: 'text',
    subtype: 'subtitles',
    name: 'French Subtitle',
    contentId: 'https://some-url/caption_fr.vtt',
    language: 'fr',
  }

  const frenchAudio = {
    id: 3,
    type: 'audio',
    name: 'French Audio',
    contentId: 'trk0001',
    language: 'fr',
  }

  client.loadMedia({
    mediaInfo: {
      contentUrl: '...',
      mediaTracks: [englishSubtitle, frenchSubtitle, frenchAudio],
    },
  }) 
  */
   
  const [data, setData] = useState({})

  const {
    uuid,
    anio,
    description,
    duration,
    //fanarts,
    landscape,
    //portrait,
    rating,
    title,
    watchlater,
  } = data

  useEffect(() => {

    const unsubscribe = redux.subscribe( () => {

      if(redux.is('google_cast')){

        let data = redux.get('google_cast')

        if(data === null) ref.current.close()
        else{
          setData(data)
          ref.current.open()
        }
      }
    });
    return () => unsubscribe()
  },[])
  
  useEffect(() => {

    const subscription = CastContext.onCastStateChanged(castState => {
      
      console.log(` >>>>>>`,castState)
      if(castState === 'connected'){
      }

    })

    return () => subscription?.remove()
  },[])
 


/*
  useEffect(() => {
    
    },[])
*/

  /*
  const googleCastDevice = () => GoogleCast.getCastDevice().then( state => { 
      //setTimeout(() => this.googleCastDevice(), 5000);
      //global.cast.devices = (state!=='NoDevicesAvailable');
      //if(state==='Connected' && !global.cast.connected){
          //EventRegister.emit('safe_area', 10);
      //}
      //this.setState({});

      console.log(state)
  });
  */
   
  /*
  useEffect(() => {

    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
      console.log('SESSION_STARTED')
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, error => {
      console.log('SESSION_ENDED')
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTING, () => {
      console.log('SESSION_STARTING')
    });
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDING, () => {
      console.log('SESSION_ENDING')
    });

    // Playing progress of the media has changed. The `mediaProgress` object contains the duration and new progress.
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PROGRESS_UPDATED,({ mediaProgress }) => {
        console.log('MEDIA_PROGRESS_UPDATED', mediaProgress.progress) 
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_START_FAILED, error => { 
      console.error(error) 
    });

    // Connection suspended (your application went to background or disconnected)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_SUSPENDED, () => { 
      console.log('SESSION_SUSPENDED') 
    });

    // Attempting to reconnect
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMING, () => { 
      console.log('SESSION_RESUMING') 
    });

    // Reconnected
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMED, () => { 
      console.log('SESSION_RESUMED') 
    });


    // Disconnected (error provides explanation if ended forcefully)
    
    // Status of the media has changed. The `mediaStatus` object contains the new status.
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_STATUS_UPDATED,({ mediaStatus }) => {
        console.log('MEDIA_STATUS_UPDATED', mediaStatus.playerState);
    })

    // Media started playing
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED,({ mediaStatus }) => {
        console.log('MEDIA_PLAYBACK_STARTED', mediaStatus)
    })

    // Media finished playing
    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_ENDED,({ mediaStatus }) => {
        console.log('MEDIA_PLAYBACK_ENDED', mediaStatus)
    })

    // Message received
    //GoogleCast.EventEmitter.addListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED,({ channel, message }) => {
    //  console.log('CHANNEL_MESSAGE_RECEIVED ', channel, message)
    //});
    
    
    GoogleCast.getCastDevice().then((device) => {
        console.log(device)
        // : { id, model, name, version }
    });


    

    return () => {
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_STARTED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_ENDED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_STARTING, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_ENDING, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.MEDIA_PROGRESS_UPDATED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_START_FAILED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_SUSPENDED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_RESUMING, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_RESUMED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.MEDIA_STATUS_UPDATED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.MEDIA_PLAYBACK_STARTED, () => null)
      GoogleCast.EventEmitter.removeListener(GoogleCast.MEDIA_PLAYBACK_ENDED, () => null)
      //GoogleCast.EventEmitter.removeListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED, () => null)
    }
  },[])
  */


  const onTest1 = async () => {

    //const response = await CastContext.getCastState()
    //notConnected || connected

   //const response = await CastContext.getDiscoveryManager()
   //const response = await CastContext.getSessionManager()
   //const response = await CastContext.getCastStateChanged()
   const response = await CastContext.showCastDialog()
   //if(!response){
   //  await CastContext.showIntroductoryOverlay()
   //}
   //const response = await CastContext.showExpandedControls()
   //const response = await CastContext.showIntroductoryOverlay()

   //sessionManager.startSession('f6c244217d28794badb2ad5dbec6d5f4')

    //console.log(devices)


    return 
    
    if (client) {

      client.loadMedia({
        mediaInfo: {
          contentUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
          contentType: 'video/mp4',
          metadata: {
            images: [
              {
                url:
                  'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg',
              },
            ],
            title: 'Big Buck Bunny',
            subtitle:
              'A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.',
            studio: 'Blender Foundation',
            type: 'movie',
          },
          streamDuration: 596, // seconds
        },
        startTime: 10, // seconds
      })

    }

    //const response = await GoogleCast.getCastDevice()
    //const response = await GoogleCast.getCastState()
    //const response = await GoogleCast.castMedia()
    //const response = await GoogleCast.showCastPicker()
    //const response = await GoogleCast.launchExpandedControls()
    //const response = await GoogleCast.showIntroductoryOverlay()
  

    //const discoveryManager = GoogleCast.getDiscoveryManager()
    //discoveryManager.startDiscovery()

     //  console.log('onTest1', discoveryManager.startDiscovery())
    //googleCastDevice()
    
    //GoogleCast.getDiscoverManager()
      //GoogleCast.showCastPicker()
      //discoveryManager.startDiscovery()
  } 

//<CastButton style={{zIndex:1, left:200, top:100, width: 24, height: 24 }} />

  return(
      <RBSheet
        ref={ref}
        height={300}
        //animationType='slide'
        animationType='none'
        closeOnDragDown={true}
        closeOnPressMask={true}
        // dragFromTopOnly={true}
        //openDuration={200}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#C2C2C2"
          },
          container: {
            backgroundColor: "transparent",
          },
        }}
      >

    <Container>
     
      <TouchClose onPress={() => ref.current.close()}>
        <Icon name="close" color='white' size={25} />
      </TouchClose>
      <View style={{height:50}} />
      {devices.map((device) => {
        const active = device.deviceId === castState?.deviceId

        //console.log(device.friendlyName, active)
        return (<TouchableOpacity
          key={device.deviceId}
          onPress={() =>
            active
            ? sessionManager.endCurrentSession()
            : sessionManager.startSession(device.deviceId)
          }
          style={{
            backgroundColor:active?'red':'transparent',
            height:50,
            //alignItems:'center',
            justifyContent:'center',
            left:20,
          }}
        ><Text style={{
            color:'white',
          }}>{device.friendlyName}</Text>
        </TouchableOpacity>
      )})
      }
      <View style={{
        flexDirection:'row', 
        alignItems:'center'
      }}>
      <TouchableOpacity
          onPress={onTest1}
          style={{top:50,height:50, justifyContent:'center', }}
        ><Text style={{color:'white',}}>Test prueba</Text>
        </TouchableOpacity>
        <CastButton style={{zIndex:1, left:200, top:100, width: 24, height: 24 }} />
      </View>

    </Container>
    </RBSheet>
  )
}
export default withTheme(GoogleCastView)
