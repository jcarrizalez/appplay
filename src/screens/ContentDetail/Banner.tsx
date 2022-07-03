import React, {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Content} from './styles'

const {
  ImageContainer, Background,ImageTouch,Fanart, ImageTop, 
} = Content

function Banner({data, imageTranslateY, headerTranslateY, height})
{
  const onFanart = useCallback((data: object) => data.fanarts[Math.floor(Math.random() * data.fanarts.length)])

  const [fanart, setFanart] = useState(onFanart(data))
  
  return (
    <ImageContainer style={[{height}, headerTranslateY]}>
      <Background style={[{height}, imageTranslateY]}>
        <ImageTouch onPress={()=> setFanart(onFanart(data))}>
          <Fanart height={height} fanart={fanart} />
        </ImageTouch>
        <ImageTop />
      </Background>
    </ImageContainer>
  )
}

Banner.propTypes = {
}
export default Banner
