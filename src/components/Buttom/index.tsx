import React from 'react'
import PropTypes from 'prop-types'
import Icon from '~/components/Icon';
//import { CastButton } from 'react-native-google-cast'
import {withTheme} from 'styled-components/native' //p=>p.theme.color

import config from 'config'

const {colors} = config()

import {
  ViewCast,
  Touch,
  TouchText,
  TextIcon,
  TextIconRow,
  Buttom,
  Loading,
} from './styles'

const CastButton = () => null

const Bt = ({theme, children, name, onPress, color, size, style={}, border}) =>
  <Touch onPress={onPress} style={[style,border===undefined?{}:{
      borderWidth:0.5,
      borderColor:color || theme.color.white,
    }]}>
    <Icon name={name} size={size || 25} color={color}/>
    {children}    
  </Touch>
Bt.propTypes = {
  name: PropTypes.string.isRequired,
}

//const Cast = props => <CastButton style={{tintColor:'white', width: 50, height: 50, ...style }} />

const Back = props => <Bt 
  {...props} 
  name='arrow-back-ios' 
  style={[{paddingLeft:8}, props.style]}
  />

const Edit = props => <Bt 
    {...props} 
    name={props.off===true?'edit-off':'mode-edit'}
    style={[{paddingLeft:1}, props.style]}
  />

const Search = props => <Bt 
  {...props} 
  name='search'
  style={[{paddingLeft:3, paddingTop:5}, props.style]}
  size={props.size || 30}
 />

const Cast22 = props => <Bt 
  {...props} 
  name='cast'
  style={[{paddingTop:2}, props.style]}
 />

 const Cast = ({theme, children, name, onPress, color, size = 25, style={}, border}) =>
  <Touch onPress={onPress} style={[style]}>
    <ViewCast/>
    <Icon 
      name='cast'
      color={color}
      style={{zIndex:0, position: 'absolute'}}
      size={(size - 1) || 25}
    />
    <CastButton style={{tintColor:color || theme.color.white, width: size, height: size, zIndex:0 }} />
  </Touch>

const Cast2 = props => 
  <CastButton 
    style={[{
      tintColor:'white',
  },props.style]}
  />

 const Menu = props => <Bt 
  {...props} 
  name='menu-open'
  style={[{}, props.style]}
  size={props.size || 32}
 />


const BtText = ({name, text, onPress = null, size = 25, style={}}) =>
  <TouchText
    onPress={onPress}
    style={style}
    >
    <Icon 
      name={name}  
      size={size || 25}
    />
    <TextIcon>{text}</TextIcon>
  </TouchText>
BtText.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

 const Info = props => 
  <BtText 
    {...props} 
    name='info-outline'
    text='Info'
    size={props.size || 30}
  />

const MyList = props =>
  props.row?  
    <BtTextRow 
      {...props} 
      name={props.check
        ? 'add-task'
        : 'add-circle-outline'
      }
      namew={
        props.loading
        ? props.check
          ? 'cloud-download'
          : 'cloud-upload'
        : props.check
          ? 'add-task'
          : 'add-circle-outline'
      } 
      text={props.loading? 'Espere...' : 'Mi Lista'}
      size={props.size || 25}
    />
  :
    <BtText 
      {...props} 
      name={props.check===true?'add-task':'add-circle-outline'} 
      text='Mi Lista'
      size={props.size || 30}
    />

const Ver = props =>
  <BtTextRow 
    {...props} 
    name={props.iscast? `cast-connected` : `play-circle-outline`}
    text={props.iscast? `Enviar` : `Ver`}
    size={props.size || 24}
  />

const Login = props =>
  <BtTextRow 
    {...props} 
    name='login' 
    text='Iniciar Sesión'
    size={props.size || 26}
  />

const BtTextRow = ({loading, name, text, onPress = null, size = 25, color='black', style={}}) =>
  <Buttom
    onPress={onPress}
    style={style}
    >
    {loading
      ? <Loading />
      : <Icon 
          name={name}
          color={color}
          size={size || 25}
        />
    }
    <TextIconRow style={{color}}>{text}</TextIconRow>
  </Buttom>
BtTextRow.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default {
  Ver:withTheme(p=><Ver {...p}/>),
  Login:withTheme(p=><Login {...p}/>),
  Info:withTheme(p=><Info {...p}/>),
  Back:withTheme(p=><Back {...p}/>),
  Edit:withTheme(p=><Edit {...p}/>),
  Cast:withTheme(p=><Cast {...p}/>),
  Menu:withTheme(p=><Menu {...p}/>),
  MyList:withTheme(p=><MyList {...p}/>),
  Search:withTheme(p=><Search {...p}/>),
}

/*
export default {
  GoogleCast,
  Button:({style}) => <CastButton style={{tintColor:'white', width: 50, height: 50, ...style }} />
}
*/