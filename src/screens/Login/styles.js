import styled from 'styled-components/native'
import {Icon} from '~/components';
import {Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard} from 'react-native'

const ios = Platform.OS === 'ios'

export const CLogin = {
  Container: styled.View.attrs({
    forceInset: { bottom: 'never' },
  })`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    flex:1;
  `,
  Keyboard: styled(KeyboardAvoidingView).attrs({
    enabled: ios,
    behavior:"padding",
    keyboardVerticalOffset:"1",
  })``,
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
    height: 50%;
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
  `,
  InputZone: styled.View`
  `,
  Input: styled.TextInput.attrs(p=>({
    placeholderTextColor: p.theme.color.backgroundInput,
    autoCapitalize: 'none',
    autoCorrect: false,
  }))`
    background-color: ${p=>p.theme.color.backgroundInput};
    font-size: 18px;
    color: ${p=>p.theme.color.colorInput};
    width: 100%;
    padding: ${ios? 14 : 12}px 15px;
    margin-bottom: 5px;
    border-radius: 10px;
    border-width: 0.5px;
    z-index: 0;
    border-color: ${p=>p.theme.color[p.error?'red':'colorInput']};
  `,
  SendButton: styled.TouchableOpacity.attrs({
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
  Text: styled.Text.attrs(({error}) => ({
    children: error? `Datos no validos`:`Sign In`
  }))`
    color :${p=>p.error? p.theme.color.orange : p.theme.color.white};
    font-size: 18px;
  `,
  Visibility: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    position: absolute;
    right: 5px;
    top: 6px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
  `,
  VisibilityIcon: styled(Icon).attrs(({active}) => ({
    name: active?`visibility`:`visibility-off`,
    color: `gray`
  }))`
  `,
  Register: styled.View`
    width: 100%; 
    justifyContent: center;
    margin-top:10px;
    flex-direction: row;
  `,
  RegisterText: styled.Text.attrs(p=>({
    children: `Nuevo en ${p.theme.company.name}? `
  }))`
    color :${p=>p.theme.color.white};
    font-size: 18px;
  `,
  RegisterLink: styled.Text.attrs({
    children: `registrate aqui.`
  })`
    color :${p=>p.theme.color.orange};
    font-size: 18px;
  `,

  Loading: styled(ActivityIndicator).attrs( p =>({
    size: 'small',
    color: p.distinct? p.theme.color.orange : p.theme.color.white,
  }))`
    display: ${p => p.active? 'flex' : 'none'};
    min-width: 5px;
    min-height: 5px
    right: 5px;
  `,
}
