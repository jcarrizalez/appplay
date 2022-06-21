import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import View from './View'
import {redux, crtl, navigator} from 'services'
import {CONTENT_PLAY, MY_LIST} from '~/endpoints'
import {useCastState} from 'react-native-google-cast'

function Buttoms({username,data:{uuid, title, watchlater, description2}})
{
  const castState = useCastState() === `connected`
  //const castState = false

  const [load, setMounted] = useState(crtl.onMounted(`content_buttoms`))
  
  const [check, setCheck] = useState(watchlater)

  const [loadingCheck, setLoadingCheck] = useState(false)

  const onWatchlater = useCallback( async function(check) {
    
    if(load.status()) return
    load.start()

    setLoadingCheck(true)

    let response = await MY_LIST({uuid, watchlater:check, is_slider:true})
    
    load.end() 

    setLoadingCheck(false)

    if(response && load.isMounted()) setCheck(response.watchlater)

  },[])

  const onPlay = useCallback( async function(iscast) {
    
    //if(load.status()) return
    //load.start()
    let response = await CONTENT_PLAY(uuid, title, iscast)
    //load.end()
    if(response && load.isMounted()){
      redux.push('google_cast', response)
    }
    else{
      navigator('Player', response)
    }

  },[])

  const onLogin = useCallback(function() {
    
    if(load.status()) return
    load.start()

    navigator('Login', {})
    load.end() 

  },[])

  useEffect(() => {
    //return () => setMounted(load.onUnMounted())
  },[])

  return (
    <View.Buttoms 
      active={username}
      check={check} 
      castState={castState}
      loading={loadingCheck} 
      description={description2} 
      onWatchlater={()=>onWatchlater(check)} 
      onLogin={onLogin}
      onPlay={()=> onPlay(castState)}
      />
    )
}

Buttoms.propTypes = {
  uuid: PropTypes.string,
  watchlater: PropTypes.bool,
  description2: PropTypes.string,
}

export default Buttoms


/*

async function onCast<Type>(uuid: string, title: string, client)
{
  
  if(load.status()) return
  load.start()

  response = await CONTENT_PLAY(uuid, title )

   load.end()
   if(!response || !load.isMounted()) return
  
  console.log(response.android)
  if (client) {

  /*

  // the ID for the French subtitle is '2' and for the French audio '3'
  client.setActiveTrackIds([2, 3])
  // or to deactivate tracks
  client.setActiveTrackIds([])

  const textTrackStyle = {
    foregroundColor: '#FF000080',
  }
  client.setTextTrackStyle(textTrackStyle)
  * /

  console.log(response.android.source.uri)
      // Send the media to your Cast device as soon as we connect to a device
      // (though you'll probably want to call this later once user clicks on a video or something)
      client.loadMedia({
        autoplay: true,
          mediaInfo: {
          contentUrl:
              response.android.source.uri,
              //'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
            //mediaTracks: [englishSubtitle, frenchSubtitle, frenchAudio],
        },
      })
    }
}
*/