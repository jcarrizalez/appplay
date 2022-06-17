import React, {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import View from './View'

function Banner({data, imageTranslateY, headerTranslateY, height})
{
  const onFanart = useCallback(data => data.fanarts[Math.floor(Math.random() * data.fanarts.length)]
  ,[])

  const [fanart, setFanart] = useState(onFanart(data))

  return (
    <View.Banner 
      imageTranslateY={imageTranslateY} 
      headerTranslateY={headerTranslateY} 
      height={height} 
      fanart={fanart} 
      onPress= {()=> setFanart(onFanart(data))}
      />
    )
}

Banner.propTypes = {
}
export default Banner
