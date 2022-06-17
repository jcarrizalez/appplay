import styled from 'styled-components/native'
import {ActivityIndicator} from 'react-native'

export const Container = styled.View`
  background-color: #00000099;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  zIndex:1;
`

export const Indicator = styled(ActivityIndicator).attrs(p=>({
  size: 'large',
  color: p.theme.color.orange
}))`
  background-color: #00000099;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  zIndex:1;
`



