import styled from 'styled-components/native'
import {Icon} from '~/components';
import {Pressable} from 'react-native'

export const Styles = {
  Container: styled.View.attrs({
    forceInset: { bottom: 'never' },
  })`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    flex:1;
  `,
  Top: styled.View`
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
  `,
  ZoneA: styled(Pressable)`
    height: 50%;
    align-items: center;
    justify-content: center;
  `,
  ZoneB: styled.View`
    height: 55%;
    padding: 0 5%;
  `,
  ZoneC: styled(Pressable)`
  `,
  Logo: styled.Image.attrs(p=>({
    resizeMode: 'contain',
    source: p.theme.logo
  }))`
    height: 150px;
    width: 150px;
    border-radius: 75px;
    margin-top: 50px;
    margin-bottom: 20px;
  `,
  Button: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    width: 100%;
    border-radius: 10px;
    margin: 25px 0;
    border-width: 0.5px;
    border-color: ${p=>p.theme.color[p.error?'red':'colorInput']};
  `,
  Wave: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
  `,
  Text: styled.Text.attrs(({name}) => ({
    children: name
  }))`
    color :${p=>p.error? p.theme.color.orange : p.theme.color.white};
    font-size: 18px;
  `,
  Footer: styled.View`
    width: 100%; 
    justifyContent: center;
    margin-top:10px;
    flex-direction: row;
  `,
}
