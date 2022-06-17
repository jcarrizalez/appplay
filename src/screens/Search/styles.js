import styled from 'styled-components/native'
import {Block, Icon, Grid, Image } from '~/components'

import {ActivityIndicator, Pressable} from 'react-native'

export const CSearch = {
  Container: styled.View`
    flex:1;
    padding-top:1px;
    background-color: ${p=>p.theme.color.backgroundPrimary};
    zIndex: 0;
  `,
  Progress: styled.View`
   width: ${({load}) => load || 0}%;
   height:1px;
   backgroundColor: ${p=>p.theme.color.orange};
  `,
  Data: styled(Grid).attrs({
    cardWidth:120,
    cardHeight:160,
    padding:5,
    margin:5,
    use:'window',
  })`
    flex:1;
    background-color: ${p=>p.theme.color.backgroundPrimary};
    zIndex: 0;
  `,
  TitleContent: styled.Text.attrs(p =>({
    children: p.title
    ? `Contenidos por "${p.title}"`
    : p.active
      ?`Novedades en ${p.theme.company.name}`
      : ``
  }))`
    color: white;
    paddingLeft: 5px;
    paddingBottom: 10px;
    paddingTop: 10px;
    font-weight: bold;
    font-size: 17px;
    margin-left: 5px;
    padding-right: 10px;
  `,
  CarouselContainer: styled.View`
    padding-top: 10px;
  `,
  CarouselData: styled(Block.Carousel).attrs(({data, theme}) =>({
    loading: false,
    item: {
      ...data,
      title: data? `Novedades en ${theme.company.name}` : ``
    }
  }))`
  `,
  PersonContainer: styled.View`
    padding-top: 10px;
  `,
  PersonData: styled(Block.Cast).attrs(({data, title}) =>({
     title: title??'',
     data: data??[]
  }))`
  `,
}
export const CSearchBar = {
  InputContainer: styled.View`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    height: ${p => (p.ishome? 50 : 80 )}px;
    justifyContent: flex-end;
    paddingRight: 20px;
    zIndex: 1;
    margin-left: 50px;
  `,
  IconLeft: styled(Icon).attrs(p=>({
    name: 'search', 
    size:25, 
    color: p.theme.color.colorInput
  }))`
    position: absolute;
    left: 2px;
    zIndex: 1;
    bottom: 7px;
  `,
  IconRight: styled(Icon).attrs(p=>({
    name: 'close', 
    size:25, 
    color: p.theme.color.colorInput
  }))`
    display: ${p => p.load? 'none' : 'flex'};
  `,
  Loading: styled(ActivityIndicator).attrs(p=>({
    size: 'small',
    color: p.theme.color.colorInput,
  }))`
    display: ${p => p.load? 'none' : 'flex'};
    min-width: 5px;
    min-height: 5px
    bottom: 12px;
    right: 12px;
    position: absolute;
    z-index: 1;
  `,
  Input: styled.TextInput.attrs(p=>({
    placeholder: `Busqueda en ${p.theme.company.name}`,
    placeholderTextColor: p.theme.color.colorInput,
    autoCapitalize: 'none',
    autoCorrect: false,
    autoFocus: true,
    showSoftInputOnFocus: true,
  }))`
    font-size: 18px;
    padding-left: 25px;
    padding-right: 30px;
    width: 100%;
    color: ${p=>p.theme.color.colorInput};
    height: 42px;
    backgroundColor:'blue',
    border-width:0.5px;
    border-color:${p=> (p.focus? p.theme.color.colorInput : p.theme.color.backgroundInput)};
    background-color: ${p=>p.theme.color.backgroundInput};
    borderRadius: 10px;
  `,
  ClearContainer: styled.TouchableOpacity.attrs({
    activeOpacity:0.7,
  })`
    position: absolute;
    right: 15px;
    alignItems: center;
    justifyContent: center;
    borderRadius: 22px;
    width: 44px;
    height: 44px;
    bottom: -1px;
    display: ${p => (p.active? 'flex' : 'none')};
  `,
}

export const Card = {
  TouchCover: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  `,
  Cover: styled(Image).attrs(({item}) =>({
    resizeMode: 'stretch',
    source:{
      uri:item.portrait,
      //cache: 'reload'
    } 
  }))`
    border-radius: 4px;
  `
}
