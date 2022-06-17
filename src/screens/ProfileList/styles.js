import styled from 'styled-components/native'
import {ActivityIndicator, StyleSheet} from 'react-native'
import Buttoms from '~/components/Buttom'

import config from 'config'

const {colors} = config()


export const Profiles = {

  Loading: styled(ActivityIndicator).attrs(p=>({
    size: 'large',
    color: p.theme.color.orange,
  }))`
    display: ${p => p.loading? 'flex' : 'none'};
    min-width: 5px;
    min-height: 5px
    top: 1px;
    right: 10px;
  `,
  Container: styled.SafeAreaView`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    height: 100%;
    width: 100%;
    alignItems: center;
    justifyContent: center;
  `,
  Title: styled.Text.attrs(({edit, username}) =>({
    numberOfLines: 1,
    children: username? (edit? `Modificar` : `Que perfil deseas usar?`) : `Espere...`
  }))`
    margin-top: 0px;
    color: ${p=>p.theme.color.white};
    font-size:20px;
    position: absolute;
    top: 10%;
  `,
  Top: styled.SafeAreaView`
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
  `
}

export const Add = styled.View.attrs({
})`
  width: 100px;
  height: 100px;
  borderWidth:1px;
  borderColor: ${p=>p.theme.color.white};
  background-color: ${p=>p.theme.color.darkGrey};
  borderRadius: 50px;
  justify-content: center;
  align-items: center;
`

export const Avatar = styled.Image.attrs({
})`
  width: 100px;
  height: 100px;
  borderWidth:1px;
  borderColor: ${p=>p.theme.color.white};
  borderRadius: 50px;
  alignSelf: center;
`

export const Area = styled.View`
  flexDirection: row;
  justifyContent: center;
`;

export const Profile = styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  margin: 20px;
  alignItems: center;
`;

export const Name = styled.Text`
  margin-top: 5px;
  color: ${p=>p.theme.color.white};
  font-size:16px;
`;

export const Scroll = styled.ScrollView`
  height: 100%;
  width: 100%;
  paddingTop: 30%;
  position: absolute;
`;

export const Title = styled.Text`
  color: ${p=>p.theme.color.white};
  font-size:20px;
  z-index: 1;
  position: absolute;
  top: 10px;
  background-color: orange;
`;


export default StyleSheet.create({
  edit:{
    position:'absolute',
    marginLeft:0,
    right:0,
    bottom:10,
    paddingLeft:0,
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:'#00000099',
  },
})
