import DropDownPicker from 'react-native-dropdown-picker'
import styled from 'styled-components/native'
import {Buttom, Block} from '~/components'
//Pressable
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'

import config from 'config'

const {colors} = config()

const ios = Platform.OS === 'ios'

export const Profile = {
  Container: styled.View.attrs({
    forceInset: { bottom: 'never' },
  })`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    flex:1;
  `,
  Edit: styled(Buttom.Edit)`
    position: absolute;
    marginLeft:0;
    right:0;
    bottom:0;
    paddingLeft:0;
    width:50px;
    height:50px;
    borderRadius:25px;
    backgroundColor: #00000099;
  `,
  ViewLogo: styled.View`
  `,
  Loading: styled(ActivityIndicator).attrs( p =>({
    size: 'small',
    color: p.distinct? p=>p.theme.color.orange : p=>p.theme.color.white,
  }))`
    display: ${p => p.active? 'flex' : 'none'};
    min-width: 5px;
    min-height: 5px
    right: 5px;
  `,
  ViewAvatars: styled.View`
    height: 130px;
    display: ${p => p.open? 'flex' : 'none'};
  `,
  Avatars: styled(Block.Avatar)``,
  Touch: styled(TouchableWithoutFeedback)``,
  Keyboard: styled(KeyboardAvoidingView).attrs({
    enabled: ios,
    //enabled:true,
    behavior:"padding",
    //behavior:"position",
    keyboardVerticalOffset:"1",
  })``,
  PickerView: styled.View`
    height: auto;
  `,
  Top: styled.View`
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
  `,
  ZoneA: styled.View`
    height: 45%;
    align-items: center;
    justify-content: center;
  `,
  ZoneC: styled.ScrollView`
    align-items: center;
    justify-content: center;
    padding: 0 5%;
  `,
  ZoneB: styled.View`
    height: 55%;
  `,
  Inputs: styled.View`
    padding: 0 5%;
  `,
  BorderLogo: styled.View`
    border-radius: 75px;
    border-color: ${p=>p.theme.color.white};
    border-width: 1px;
  `,
  Logo: styled.Image.attrs(({data}) => ({
    resizeMode: 'contain',
    source: {uri:`${data?.image}`}
  }))`
    height: 150px;
    width: 150px;
    border-radius: 75px;
  `,
  DropDownPicker: styled(DropDownPicker).attrs( p => ({
    listMode:"SCROLLVIEW",
    placeholder: p.name??'',
    dropDownContainerStyle:{
      borderColor: p.theme.color.colorInput,
      color: p.theme.color.white,
      fontSize: 18,
      borderRadius: 5,
      backgroundColor: p.theme.color.backgroundInput,
    },
    placeholderStyle:{
      color: '#696969',
      fontSize: 18,
      opacity: 0.5
    },
    textStyle:{
      fontSize: 18,
      color: p.theme.color.colorInput,
    },
    dropDownMaxHeight:240,
    showArrowIcon: true,
    showTickIcon: true,
    arrowIconStyle:{
    },
    tickIconStyle:{
      //backgroundColor: p.theme.color.colorInput,
      //borderRadius: 50,
    },
    closeIconStyle:{
      backgroundColor: 'red',
      color: 'blue'
    },
    iconContainerStyle:{
      backgroundColor: 'red',
       color: 'blue'
    },
  }))`
    background-color: ${p=>p.theme.color.backgroundInput};
    font-size: 18px;
    color: ${p=>p.theme.color.colorInput};
    width: 100%;
    padding: 15px;
    margin-bottom: 5px;
    border-radius: 10px;
    border-width: 0.5px;
    border-color: ${p=>p.theme.color.colorInput};
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
    border-color: ${p=>p.theme.color[p.error?'red':'lightGrey']};
  `,
  SendButton: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    width: 100%;
    border-radius: 10px;
    margin: 25px 0;
    border-width: 0.5px;
    border-color: ${p => p.distinct? p.theme.color.orange : p.theme.color.lightGrey};
  `,
  Wave: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
  `,
  Text: styled.Text.attrs(p => ({
    children: p.active? `Espere...`:`Guardar`
  }))`
    color :${p => p.distinct? p.theme.color.orange : p.theme.color.white};
    font-size: 18px;
  `
}