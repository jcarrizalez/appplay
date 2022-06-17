import React from 'react'
import PropTypes from 'prop-types';
import {Item} from './styles';
  
const Dad = ({title, icon, active, solid, onPress = null}) => 
(
  <Item.Dad onPress={onPress}>
    <Item.Left name={icon}/>
    <Item.Text title={title} />
    {solid!==undefined
      ? null 
      : <Item.Right active={active}/>
    }
  </Item.Dad>
)

Dad.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

const Children = ({title, onPress}) => 
(
  <Item.Children onPress={onPress}>
    <Item.Text title={`- ${title}`} />
  </Item.Children>
)

Children.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default {
  Dad,
  Children
}
