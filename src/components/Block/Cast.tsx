import React,{useCallback} from 'react'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import {Cast} from './styles'
import {withTheme} from 'styled-components/native'

function BlockCast({theme, onPress, onScroll, title, data, loading })
{
  const renderItem = useCallback( ({item, index}) => 
  (
    <Cast.Item 
      key={index} 
      width={110} 
      onPress={() => onPress(item)}
    >
      <Cast.Image 
        image={item.image ?? theme.color.avatar} 
      />
      <Cast.Name>{item.name}</Cast.Name>
    </Cast.Item>
  ), [onPress])

  return (
    <>
    <Cast.Top>
      <Cast.TopLeft loading={loading}>{title}</Cast.TopLeft>
      <Cast.TopRight loading={loading}/>
    </Cast.Top>
      <Cast.List
        data={data}
        renderItem={renderItem}
        onEndReached={onScroll}
      />
    </>
  )
}

BlockCast.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  //id: PropTypes.int,
  //onScroll: PropTypes.function,
  //onPress: PropTypes.function,
}

export default withTheme(BlockCast)
