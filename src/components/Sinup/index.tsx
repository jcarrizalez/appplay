import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
  onPress: PropTypes.func,
}

const Icon = ({name, style = {}, color = 'white', onPress = null, size = 30 }) =>
  <MaterialIcons 
    name={name} 
    size={size} 
    color={color}
    style={style}
    solid 
  />

Icon.propTypes = propTypes

export default Icon