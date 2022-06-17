import React from 'react';
import PropTypes from 'prop-types'
import {Card} from './styles';

const CardContentSearch = ({item, style, onPress}) =>
(
  <Card.TouchCover onPress={()=> onPress(item)}>
    <Card.Cover 
      item={item} 
      style={style}
    />
  </Card.TouchCover>
)

CardContentSearch.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default CardContentSearch