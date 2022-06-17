import React,{useCallback} from 'react'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import {Avatar} from './styles'
import {withTheme} from 'styled-components/native'

function BlockAvatar({onPress, data})
{
  const renderItem = useCallback( ({item, index}) => 
  (
    <Avatar.Item 
      key={index} 
      onPress={()=>onPress(item)}
    >
      <Avatar.Image image={item.image} />
    </Avatar.Item>
  ), [onPress])

  return (
    <Avatar.List
      data={data}
      renderItem={renderItem}
    />
  )
}

BlockAvatar.propTypes = {
  data: PropTypes.array,
  onScroll: PropTypes.func,
}

export default withTheme(BlockAvatar)