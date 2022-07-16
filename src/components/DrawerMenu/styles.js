import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '~/components/Icon'

export const Menu = {
  Container: styled.View`
    width:100%;
    height: 100%;
    padding-bottom:30px;
    background-color: ${p=>p.theme.color.backgroundPrimary};
  `,
  Header: styled.View`
    border-color: ${p=>p.theme.color.orange};
    border-bottom-width:1px;
  `,
  Footer: styled.Text.attrs(p=>({
    children: p.theme.company.url_name
  }))`
    fontSize: 16px;
    textAlign: center;
    width: 100%;
    color: ${p=>p.theme.color.lightGrey};
    bottom: ${p=>(p.active? '30px' : 'undefined')};
    position: ${p=>(p.active? 'absolute':'undefined')};
    display:${p => (p.active? 'none':'flex')};
  `,
  Hr: styled.View`
    background-color: ${p=>p.theme.color.orange};
    width: 100%;
    height: 1px;
    margin-bottom: ${p=>(p.active? 0:20)}px;
  `,
  ScrollView: styled.ScrollView.attrs({
    showsVerticalScrollIndicator:true,
    showsHorizontalScrollIndicator:false,
    persistentScrollbar:true,
    indicatorStyle: 'white',            
  })`
    borderColor: ${p=>p.theme.color.lightGrey};
    borderTopWidth: 0.5px;
    //maxHeight: ${p => (p.height??110)}px;
    flex: 1;
    height: 100%;
    //display: ${p => (p.dropdown===true? 'flex':'none')};
    //display: flex;
  `,
  ViewA: styled.View.attrs({
    //showsVerticalScrollIndicator:true,
    //showsHorizontalScrollIndicator:false,
    //persistentScrollbar:true,
    //indicatorStyle: 'white',            
  })`
    //borderColor: ${p=>p.theme.color.lightGrey};
    //borderTopWidth: 0.5px;
    //maxHeight: ${p => (p.height??110)}px;
    height: auto;
    display: ${p => (p.dropdown===true? 'flex':'none')};
  `,
  ViewB: styled.View.attrs({
    //showsVerticalScrollIndicator:true,
    //showsHorizontalScrollIndicator:false,
    //persistentScrollbar:true,
    //indicatorStyle: 'white',            
  })`
    //borderColor: ${p=>p.theme.color.lightGrey};
    //borderTopWidth: 0.5px;
    height: auto;
    display: ${p => (p.dropdown===true? 'flex':'none')};
  `
}

export const Avatar = {
  Gradient: styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 1, y: 1 },
    locations:[0, 0.50],
    colors:[p.theme.color.backgroundSecondary, 'transparent'],
  }))`
    height: 180px;
    align-items: flex-start;
    justify-content: center;
  `,
  Image: styled.Image.attrs(({url}) => ({
    source:{uri:url},
  }))`
  width: 100.1%;
  height: 100%;
  border-radius: 50px;
  align-self: center;
  `,
  Name: styled.Text.attrs(({info}) => ({
    children: info?.profile_name??`  Invitado`
  }))`
    font-size: 18px;
    text-align: center;
    color: ${p=>p.theme.color.white};
    position: absolute;
    bottom: 10px;
    left: 40px;
  `,
  Background: styled.Image.attrs(p=>({
    resizeMode: 'cover',
    source:{uri: p.theme.company.backgroundMenu}
  }))`
    width: 100%;
    height: 100%;
    opacity: 0.3;
    position: absolute;
  `,
  Touch: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    width:100px;
    height: 100px;
    position: absolute;
    border-color: orange;
    border-radius: 50px;
    border-width:1.5px;
    bottom: 35px;
    left: 30px;
    background-color: ${p=>p.theme.color.lightGrey};
  `,
  Change: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    position: absolute;
    bottom: 5px;
    right: 10px;
  `,
  Icon: styled(Icon).attrs(({info}) => ({
    name: info?.username?'multiple-stop':'login'
  }))`
  `
} 


export const Item = {
  Dad: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    height:40px;
    margin-top: 10px;
  `,
  Text: styled.Text.attrs(({title}) => ({
    children: title??``
  }))`
    font-size: 18px;
    text-align: center;
    color: ${p=>p.theme.color.white};
    position: absolute;
    left:55px;
    bottom:10px;
  `,
  Children: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    height:30px;
    margin-top: 10px;
  `,
  Left: styled(Icon)`
    position: absolute;
    top: 3px;
    left: 10px;
  `,
  Right: styled(Icon).attrs(({active}) => ({
    name: active===true? `keyboard-arrow-up` : `keyboard-arrow-down`
  }))`
    position: absolute;
    top: 5px;
    right: 10px;
  `,
}