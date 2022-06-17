import styled from 'styled-components/native'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'


const dark = '#212121'
const light = '#E5E8E8'

export const App = {
  Container: styled.View`
    flex: 1px;
    backgroundColor: ${p=>p.theme.color.backgroundPrimary};
  `,
  SafeAreaProvider: styled(SafeAreaProvider)``,
  StatusBar: styled(StatusBar).attrs(p=>({
    translucent: true,
    barStyle: p.theme.color
    ? `${p.theme.color.statusBar}-content` 
    : p.isDark
      ? `light-content` 
      : `dark-content` 
    ,
    backgroundColor:`transparent` 
  }))`
  `,
  StatusBarHidden: styled(StatusBar).attrs({
    hidden: true,
  })``,
  Default: styled.View`
    flex: 1px;
    backgroundColor: ${p=>p.isDark? '#212121' : '#E5E8E8'};
  `
}