import React, {useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Animated} from 'react-native'
import Banner from './Banner'
import Buttoms from './Buttoms'
import Related from './Related'
import View from './View'
import styled from '~/components'
import {crtl, contents, onUnique, navigator} from 'services'
import {animations} from 'config'

import {CONTENT_SEARCH , CONTENT_DETAIL} from '~/endpoints'

/*TEST* /
import  GoogleCast, { CastButton, useRemoteMediaClient, useStreamPosition } from 'react-native-google-cast'
/*TEST* /
/*TEST* /
  const sessionManager = GoogleCast.getSessionManager()

  const client = useRemoteMediaClient()

  const streamPosition = useStreamPosition()
/*TEST*/
//console.log(sessionManager)
//fn.onCast(uuid, title, client)

//console.log(client.setStreamMuted(true))
//console.log(client.play())
//console.log(client.pause())
//console.log(client.stop())


function ContentDetail({route, theme})
{
  const {username} = theme.session.info_user

  const [load, setMounted] = useState(crtl.onMounted(`content`))
  
  const scrollY = useRef(new Animated.Value(0)).current;

  const [data, setData] = useState(route.params??{})

  const [related, setRelated] = useState(null)

  const onPlay = useCallback(async function(uuid, title){

    if(load.status()) return
    load.start()

    let response = await CONTENT_PLAY(uuid, title)

    if(response && load.isMounted()) navigator('Player', response)
    load.end()

  },[])

  const onTags = useCallback(async function(selected, tags){

    if(selected.length === 0) return

    if(load.status()) return
    load.start()

    let {slug, name} = tags.find(tag => tag.name===selected[0]??null)

    let response = await CONTENT_SEARCH('tags', {slug, name} )

    if(response && load.isMounted()) navigator('ContentSearch', response)
    load.end()  

  },[])

  const onContentSearch = useCallback(async function(type, {slug, name}){

    if(load.status()) return
    load.start()

    let response, params

    switch(type){
      case 'genres':
        response = await CONTENT_SEARCH('genres', {slug, name} )
      break
      case 'countries':
        response = await CONTENT_SEARCH('countries', {slug, name} )
      break
      case 'stars':
      case 'directors':
        response = await CONTENT_SEARCH('person', {slug, name, as: type} )
      break
      default:
        response = null
      break
    }
    if(response) navigator('ContentSearch',response)
    load.end()

  },[])

  useEffect(() => {

    async function onLoad(){

      let {is_player, title, uuid, tags} = data

      if(is_player) onPlay(uuid, title)

      if(!load.isMounted()) return

      let response = await CONTENT_DETAIL(uuid, title)

      if(response || load.isMounted()) setData(response) 
    }
    onLoad()

    //return () => setMounted(load.onUnMounted())
  },[])

  return (
    <View.ContentDetail 
      data={data??{}}
      username={username}
      onTags={item => onTags(item, data?.tags)}
      onContentSearch={onContentSearch}
      animations={animations.ContentDetail(scrollY)}
      onScroll={Animated.event}
      Buttoms={Buttoms}
      Related={Related}
      Banner={Banner}
      >
    </View.ContentDetail>
  )
}

ContentDetail.propTypes = {
  route: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default styled(ContentDetail)
