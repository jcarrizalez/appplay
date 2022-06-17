import styled from 'styled-components/native'
import {TouchableNativeFeedback} from 'react-native'

import PagerView from 'react-native-pager-view'
import LinearGradient from 'react-native-linear-gradient'


export const Container = styled.View`
  flex: 1;
`

export const Section = {
  Container: styled(PagerView).attrs({
    initialPage:0
  })`
    backgroundColor: ${p=>p.theme.color.backgroundPrimary};
    flex: 1;
  `,
  Item: styled.View`
    align-items: center;
    justify-content: flex-end;
  `,
  Background: styled.Image.attrs(p => ({
    source:{uri: p.image},
    resizeMode: 'stretch'
  }))`
    position: absolute;
    top:0;
    width: 100%;
    height: 70%;
  `,
  Gradient: styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 0, y: 1 },
    locations:[0, 0.30],
    colors:['transparent',p.theme.color.backgroundPrimary ],
  }))`
    height: 50%;
    width: 100%;
    position: absolute;
    bottom: 0;
  `,
  Footer: styled.View`
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 40%;
  `,
  Title: styled.Text.attrs({
    numberOfLines:2
  })`
    color: ${p=>p.theme.color.white};
    font-size: ${p => p.size || 27}px;
    text-align:  center;
    margin-horizontal: 10%;
    position: absolute;
    top:50px;
  `,
  Description: styled.Text.attrs({
    numberOfLines:2
  })`
    color: ${p=>p.theme.color.white};
    font-size: 15px;
    text-align: center;
    margin-horizontal: 15%;
    position: absolute;
    top:150px;
  `
}

export const Footer = {
  Container: styled.View`
    display: flex;
    flexDirection: column;
    alignItems: center;
    position: absolute;
    bottom:0;
    width: 100%; 
    height:0;
  `,
  Points: styled.View`
    display: flex;
    flexDirection: row;
    marginLeft: 15px;
    position: absolute;
    bottom: 80px;
    height: 20px;
  `,
  Point: styled.View`
    margin-right: 10px;
    border-width: 0.2px;
    borderColor: black;
    borderRadius: 4px;
    width: 8px;
    height: 8px;
    backgroundColor: ${p => p.active? p.theme.color.orange : p.theme.color.lightGrey};
  `,
  Zone: styled.View`
    width: 80%;
    height: 55px;
    position: absolute;
    bottom: 20px;
    shadowOpacity: 0.26;
    box-shadow: 0.5px 0.5px 0.2px white;
    elevation: 4;
    borderRadius: 10px;
  `,
  Buttom: styled.View`
    display:  flex;
    justifyContent: center;
    alignItems: center;
    borderColor: black;
    height: 55px;
    borderRadius: 10px;
    backgroundColor: orange;
  `,
  Touch: styled(TouchableNativeFeedback).attrs({
    delayLongPress: 1000,
    disabled: false,
    activeOpacity:0.6
  })`
    display: flex;
    width: 80%;
    justifyContent: center;
    alignItems: center;
    borderColor: black;
    height:55px;
    borderRadius: 10px;
    backgroundColor: orange;
    position: absolute;
    bottom: 20px;
  `,
  Text: styled.Text`
    fontSize: 22px;
    color: white;
    box-shadow: 0.5px 0.5px 0.2px black;
  `
}