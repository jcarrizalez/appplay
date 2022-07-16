import React,{useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {redux, onUnique, nexPage} from 'lib'
import styled, {Block, Publicity} from '~/components'
import {Blocks} from './styles'
import fn from './functions'

function MarketingBlock({serviceContent, serviceBlock, position, item})
{
  const [load, setLoad ] = useState(true)

  const [data, setData ] = useState(item)

  const [slug] = useState(item.slug)

  const onEventRedux = useCallback( (type, event) => {

    if(type === data.slug) return setData({...data,...event, date:new Date()})

    if(type === `watchlater` && data.slug === 'mi_lista_mix'){

        let {uuid, watchlater} = event
        let {slug, elements} = data

        return setData({
          ...data,
          elements: watchlater
            ? [uuid].concat(elements)
            : elements?.filter( item => item !== uuid)
        })
    }

  },[data])

  const onBlockId = useCallback( async({is_watching, is_channel, item}) => {

    let page = nexPage(data.metadata)

    if(!load || !page || !serviceBlock.isMounted()) return

    setLoad(false)

    let response = await serviceBlock.findById(data.id, {page})

    if(!serviceBlock.isMounted()) return

    setLoad(true)

    if(!response) return

    setData({
      ...data,
      metadata: response.metadata, 
      elements: data.elements.concat(response.elements)
    })

  },[data])

  const onContentInfo = useCallback( ({is_watching, is_channel, item}) => {

    if(is_channel) serviceContent.navigator('ChannelDetail', item)
    else if(is_watching) serviceContent.navigator('ContentDetail', item)
    else serviceContent.info(item.uuid)
  })

  const onPlay = useCallback( ({item}) => serviceContent.navigator('ContentDetail', {...item, is_player: true}))

  useEffect(() =>
  {
    let use = [`estas_viendo`, `mi_lista_mix`].indexOf(data?.slug) !== -1

    const unsubscribe = use
      ? redux.subscribe( function(){

          let current = redux.current()

          if([
            `watchlater`, 
            `estas_viendo`, 
            `mi_lista_mix`
          ].indexOf(current) !== -1) return onEventRedux(current, redux.get(current))

        })
      : null

    return () => use ? unsubscribe() : {}
  },
  [data])

  var props = {
    loading:!load,
    item:{
      ...data,
      elements: serviceContent.contents.get(onUnique(data.elements))
    },
    onPress: onContentInfo,
    onLongPress: onPlay,
    onScroll: onBlockId
  }

  switch(item.type){
    case 'carousel':
      return (
        <>
          <Block.Carousel {...props}/>
          <Publicity.Marketing position={position}/>
        </>
      )
    case 'channel':
      return (
        <>
          <Block.Channel {...props}/>
          <Publicity.Marketing position={position}/>
        </>
      )
    default:
      return null
  }
}

MarketingBlock.propTypes = {
  item: PropTypes.object.isRequired,
}

export default styled(MarketingBlock)