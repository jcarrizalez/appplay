import React,{useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {redux, contents, onUnique} from 'services'
import styled, {Block, Publicity} from '~/components'
import {Blocks} from './styles'
import fn from './functions'

function MarketingBlock({position, item})
{
  const [load, setLoad ] = useState(true)

  const [data, setData ] = useState(item)
  const [slug] = useState(item.slug)

  const onEventRedux = useCallback( (type, event) => fn.onEventRedux(type, event, data, setData),
  [data])
  
  useEffect(() =>
  {
    let mi_lista_mix = 'mi_lista_mix'
    let estas_viendo = 'estas_viendo'
    let watchlater = 'watchlater'

    let use = [`estas_viendo`, `mi_lista_mix`].indexOf(data?.slug) !== -1

    const unsubscribe = use
      ? redux.subscribe( function(){

          let current = redux.current()
          switch(current){
              case `watchlater`:
              case `estas_viendo`:
              case `mi_lista_mix`:
                return onEventRedux(current, redux.get(current))
              default:
                return
          }
        })
      : null

    return () => use? unsubscribe() : {}
  },
  [data])

  var props = {
    loading:!load,
    item:{
      ...data,
      elements: contents.get(onUnique(data.elements))
    },
    onPress: fn.onContentInfo,
    onLongPress: fn.onPlay,
    onScroll: async () => fn.onBlockId(load, data, setLoad, setData)
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