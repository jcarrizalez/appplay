import React, {useRef, useEffect, useState, useCallback} from 'react'
import Icon from '~/components/Icon'
import {redux, toast, contents} from 'services'
import Buttoms from './Buttoms'
import {Sheet} from './styles'
import fn from './functions'
import {withTheme} from 'styled-components/native'

function ContentInfo()
{
  const ref = useRef()

  const [data, setData] = useState({})

  const onClose = useCallback( () => ref.current.close(),
  [])
  const onImageLoad = useCallback( () => setData({...data, loadimg: true}),
  [data])
  
  const onContentDetail = useCallback( () => fn.onContentDetail(data, onClose),
  [data])

  useEffect(() =>
  {
    const unsubscribe = redux.subscribe( () =>
    {
      if(!redux.is('content_info')) return

      let response = contents.find(redux.get('content_info'))

      if(!response) return toast(`Contenido no disponible`)
      
      response.loadimg = false
      setData(response)
      
      ref.current.open()
    })

    return () => unsubscribe()

  },[])

  return(
    <Sheet.Container ref={ref}>
      <Sheet.View>
        <Sheet.HeaderLine/>
        <Sheet.HeaderLeft>
          <Sheet.TouchImage onPress={onContentDetail}>
            <Sheet.HeaderImage data={data} onLoadEnd={onImageLoad}/>
          </Sheet.TouchImage>
          {data?.loadimg
            ? null
            : <Sheet.HeaderLoading/>
          }
        </Sheet.HeaderLeft>

        <Buttoms data={data} onClose={onClose} />

        <Sheet.Title data={data} />
        <Sheet.AnioRating data={data} />
        <Sheet.Duration data={data} />
        <Sheet.Description data={data} onPress={onContentDetail} />
        <Sheet.Imdb>
          <Icon name="star" color='gray' size={15}/>
          <Icon name="star" color='gray' size={15}/>
          <Icon name="star" color='gray' size={15}/>
          <Icon name="star-half" color='gray' size={15}/>
          <Icon name="star-border" color='gray' size={15}/>
        </Sheet.Imdb>
        
        <Sheet.FooterContainer onPress={onContentDetail}>
          <Sheet.FooterLine />
          <Sheet.FooterLeft />
          <Sheet.FooterCenter />
          <Sheet.FooterRight />
        </Sheet.FooterContainer>
        
        <Sheet.CloseContainer onPress={onClose}>
          <Sheet.CloseIcon />
        </Sheet.CloseContainer>
      </Sheet.View>
    </Sheet.Container>
  )
}

export default withTheme(ContentInfo)
