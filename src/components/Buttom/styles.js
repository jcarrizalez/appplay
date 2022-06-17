import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

export const ViewCast = styled.View`
  height: 46px;
  width:46px;
  border-radius: 23px;
  position: absolute;
  z-index: 1;
`

export const Loading = styled(ActivityIndicator).attrs({
  size: 15,
  color: 'black',
})`
  margin: 6px 5px 4px 5px;
`


export const Touch = styled.TouchableOpacity.attrs({
    delayPressIn:3000,
    activeOpacity:0.7
  })`
  height: 46px;
  width:46px;
  border-radius: 23px;
  justify-content: center;
  align-items: center;
  marging-left: 5px;
`

export const TouchText = styled.TouchableOpacity.attrs({
      activeOpacity:0.7
  })`
  height: 60px;
  width:60px;
  border-radius: 30px;
  align-items: center; 
  justify-content: center; 
`

export const TextIcon = styled.Text`
  color: ${p=>p.theme.color.white};
  position: absolute;
  top:50px;
`

export const TextIconRow = styled.Text`
  fontSize:14px;
  top:1px;
  left:2px;
`

export const Buttom = styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  padding: 5px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${p=>p.theme.color.white};
`
