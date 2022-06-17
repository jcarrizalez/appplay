import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components/native' //p=>p.theme.color

const Icon = ({theme, name, style, color, size}) =>
{
  return (
  <MaterialIcons 
    name={name} 
    size={size || 30} 
    color={color || theme.color.white}
    style={style || {}}
    //solid 
  />
)
}
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  //style: PropTypes.object,
  //color: PropTypes.string,
  onPress: PropTypes.func,
}

export default withTheme(Icon)