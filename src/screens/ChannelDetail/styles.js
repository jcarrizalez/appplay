import styled from 'styled-components/native'
import {Grid} from '~/components'
import LinearGradient from 'react-native-linear-gradient'
import {ActivityIndicator} from 'react-native'

export const Channel = {
  Container: styled.View`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    width: 100%;
    height: 100%;
  `,
  Top: styled.View`
    zIndex: 1;
  `,
  TitleGradient: styled(LinearGradient).attrs(p =>({
    colors:['transparent', p.theme.color.backgroundPrimary ]
  }))`
    position: absolute;
    height: 60px;
    top: 190px;
    width: 100%;  
    zIndex: 1;
  `,
  GridGradient: styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 0, y: 1 },
    locations:[0, 0.9],
    colors:[p.theme.color.backgroundPrimary, 'transparent']
  }))`
    opacity: 0.8;
    position: absolute;
    height: 10px;
    width: 100%;  
    zIndex: 1;
    top: 248px;
  `,
  TitleView: styled.View`
    height: 100%; 
    width: 100%; 
    position: absolute;
    bottom: 0;
    zIndex: 1;
    justifyContent: flex-end;
    alignItems: flex-start;
    paddingLeft: 10px;
  `,
  TitleText: styled.Text.attrs(({data}) =>({
    numberOfLines: 1,
    children: data.title
  }))`
    color: white;
    color: ${p => p.loading? p.theme.color.orange : p.theme.color.white};
    font-size: 25px;
    font-weight: bold;
    font-style: italic;
    width:100%;
  `,
  ImageContainer: styled.View`
    backgroundColor: ${p=>p.theme.color.backgroundPrimary};
    overflow: hidden;
    height: 50px;
  `,
  Background: styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: null;
    resizeMode: cover;
    height: 50px;
  `,
  Fanart: styled.Image.attrs( ({fanart}) =>({
    source:{uri:fanart},
  }))`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: null;
    resizeMode: cover;
    height: ${p => p.height}px;
  `,
  ImageTop:  styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 0, y: 1 },
    locations:[0, 0.9],
    colors:[p.theme.color.backgroundPrimary, 'transparent' ],
  }))`
    position: absolute;
    top: 0;
    height: 120px; 
    width: 100%;
  `,
  Footer: styled.View`
    height: 30px;
  `,
  Loading: styled(ActivityIndicator).attrs(p=>({
    size: 'small',
    color: p.theme.color.orange,
  }))`
    display: ${p => p.loading? 'flex' : 'none'};
    min-width: 5px;
    min-height: 5px
    bottom: 5px;
    right: 10px;
    position: absolute;
    z-index: 1;
  `,
  Grid: styled(Grid).attrs({
    cardWidth:120,
    cardHeight:160,
    padding:5,
    margin:5,
    use:'window',
  })`
    flex:1;
    background-color: ${p=>p.theme.color.backgroundPrimary};
  `,
  DescriptionData: styled.Text.attrs(({data,is2}) =>({
    children: is2? (data.description2??``) : (data.description1??data.description)
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 14px;
    padding: 15px 10px 10px 10px;
    text-align: justify;
  `,
  GridTouchCover: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  `,
  GridCover: styled.Image.attrs(props =>({
    resizeMode: 'stretch',
    source:{
      uri:props.image,
      //cache: 'reload'
    } 
  }))`
    border-radius: 4px;
  `,
}
