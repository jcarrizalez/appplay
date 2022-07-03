import React,{useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import styled from '~/components'
import ViewBanner from './ViewBanner'
import {redux, onUnique} from 'lib'

const genres = [
  {slug:'drama', name:'Drama'},
  {slug:'accion', name:'Accion'},
  {slug:'suspenso', name:'Suspenso'},
  {slug:'cine-nacional', name:'Cine nacional'},
]

function BannerMarketing({serviceContent, serviceUser, theme, height, headerTranslateY, imageTranslateY, actionsOpacity})
{
  const [banners] = useState(onUnique(redux.get('banners_contents')).filter((uuid, key) => key < 20))

  const [content, setContent] = useState({
    currentKey: 0,
    metadata: serviceContent.infoByBanner(banners[0])
  })

  const onContentSearch = useCallback( (type: string, {slug, name}) => serviceContent.search(type, {slug, name}))

  const onChangeContent = useCallback( () => {

    let key = content.currentKey

    key = key < (banners.length -1) ? (key + 1) : 0

    setContent({
      currentKey: key,
      metadata: serviceContent.infoByBanner(banners[key])
    })    

  }, [content, banners])

  const onWatchlater = useCallback( async () => {

    let {uuid, watchlater} = content.metadata

    if(!uuid || !serviceUser.isMounted()) return

    let response = await serviceUser.watchlater(uuid, !watchlater)

    if(!response || !serviceUser.isMounted()) return

    content.metadata.watchlater = response.watchlater
    
    setContent({...content, date: new Date()})

  },[content, banners])

  useEffect(() =>
  {
    const unsubscribe = redux.subscribe( () =>
    {
      if(!redux.is('watchlater')) return

      content.metadata = serviceContent.infoByBanner(banners[content.currentKey])
      
      setContent({...content, date: new Date()})
    })
    return () => unsubscribe()

  },[content])

  return(
    <ViewBanner
      onChangeContent={onChangeContent}
      content={content}
      theme={theme}
      genres={genres}
      height={height}
      headerTranslateY={headerTranslateY}
      imageTranslateY={imageTranslateY}
      actionsOpacity={actionsOpacity}
      onContentInfo={() => serviceContent.info(content.metadata.uuid)}
      onWatchlater={onWatchlater}
      onContentSearch={onContentSearch}
      />
  )
}

BannerMarketing.propTypes = {
  height: PropTypes.number.isRequired,
  actionsOpacity: PropTypes.object.isRequired,
  imageTranslateY: PropTypes.object.isRequired,
  headerTranslateY: PropTypes.object.isRequired,
}

export default styled(BannerMarketing)
