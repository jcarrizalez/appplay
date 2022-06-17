import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'
import Icon from '~/components/Icon'
import Buttoms from '~/components/Buttom'
import RBSheet from "react-native-raw-bottom-sheet"

export const Info = {
  Title: styled.Text.attrs({
    numberOfLines:1
  })`
    color: ${p=>p.theme.color.white};
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    top: 160px;
    left: 10px;
  `,
  AnioRating: styled.Text.attrs({
    numberOfLines:1
  })`
    color: ${p=>p.theme.color.lightGrey};
    font-size:14px;
    position: absolute;
    top: 20px;
    left: 240px;
  `,
  Duration: styled.Text.attrs({
     numberOfLines:1
  })`
    color: ${p=>p.theme.color.lightGrey};
    font-size: 14px;
    position: absolute;
    top: 36px;
    left: 240px;
  `,
  Description: styled.Text.attrs({
     numberOfLines:3
  })`
    color: ${p=>p.theme.color.white};
    font-size: 14px;
    position: absolute;
    top: 180px;
    width: 100%;
    padding: 10px;
  `,
  Imdb: styled.View`
    height: 50px;
    width:200px;
    left:240px;
    top:54px;
    position: absolute;
    flex-direction: row;
  `
}

export const Sheet = {
  Container: styled(RBSheet).attrs(p=>({
    height:300,
    //animationType='slide'
    animationType:'none',
    closeOnDragDown: true,
    closeOnPressMask: true,
    // dragFromTopOnly={true}
    //openDuration={200}
    customStyles:{
      wrapper: {
        backgroundColor: "transparent",
        zIndex: 1
      },
      draggableIcon: {
        backgroundColor:  p.theme.color.lightGrey
      },
      container: {
        backgroundColor: "transparent",
        zIndex: 1
      },
    }
    }))`
  `,
  View: styled.View`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    position: absolute;
    top:0;
    width: 100%; 
    height: 100%; 
    zIndex:-1; 
    border-top-left-radius:12px; 
    border-top-right-radius:12px;
    border-color: ${p=>p.theme.color.lightGrey};
    border-width:0.8px;
    border-bottom-width:0;
  `,
  HeaderLine: styled.View`
    border-right-width: 0.3px;
    border-color: ${p=>p.theme.color.lightGrey};
    height: 126px;
    width: 1px;
    position: absolute;
    top: 27px;
    left: 222px;
  `,
  HeaderLeft: styled.View`
    position: absolute;
    left: 10px;
    top: 25px;
    height: 130px;
    width:195px;
    border-radius: 2px;
    border-color:  ${p=>p.theme.color.lightGrey};
    border-width:0.5px;
    background-color: #012554;
  `,
  HeaderImage: styled.Image.attrs(({data}) => ({
    resizeMode: 'contain',
    source:{uri:data.landscape},
  }))`
    position: absolute;
    height: 129px;
    width:194px;
    border-radius: 2px;
  `,
  HeaderLoading: styled(ActivityIndicator).attrs({
    size:'large',
    color: p=>p.theme.color.orange,
  })`
    top: 50px;
  `,
  Title: styled.Text.attrs(({data}) => ({
    numberOfLines:1,
    children:data?.title
  }))`
    color: ${p=>p.theme.color.white};
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    top: 160px;
    left: 10px;
  `,
  AnioRating: styled.Text.attrs(({data}) => ({
    numberOfLines:1,
    children:`${data?.anio} ${data?.rating}`
  }))`
    color: ${p=>p.theme.color.lightGrey};
    font-size:14px;
    position: absolute;
    top: 20px;
    left: 240px;
  `,
  Duration: styled.Text.attrs(({data}) => ({
    numberOfLines:1,
    children: data?.duration
  }))`
    color: ${p=>p.theme.color.lightGrey};
    font-size: 14px;
    position: absolute;
    top: 36px;
    left: 240px;
  `,
  Description: styled.Text.attrs(({data}) => ({
    numberOfLines:3,
    children: data?.description
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 14px;
    position: absolute;
    top: 180px;
    width: 100%;
    padding: 10px;
  `,
  Imdb: styled.View`
    height: 50px;
    width:200px;
    left:240px;
    top:54px;
    position: absolute;
    flex-direction: row;
  `,
  FooterContainer: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    position: absolute;
    bottom: 20px;
    padding: 0px;
    width: 100%;
    height: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding-left: 20px;
    padding-right: 20px;
  `,
  FooterLine: styled.View`
    border-top-width: 0.3px;
    borderColor: ${p=>p.theme.color.lightGrey};
    height: 1px;
    bottom:30px;
    width: 100%; 
    position: absolute;
  `,
  FooterLeft: styled(Icon).attrs({
    name:'info-outline',
    color: p=>p.theme.color.white,
    size: 20,
  })`
    color: ${p=>p.theme.color.white};
    position: absolute;
    left: 20px;
  `,
  FooterCenter: styled.Text.attrs({
    children:'Ver mas detalles',
  })`
    color: ${p=>p.theme.color.white};
    fontSize: 14px;
    bottom: 1px;
  `,
  FooterRight: styled(Icon).attrs(p=>({
    name:'keyboard-arrow-right',
    color: p.theme.color.white,
    size: 25,
  }))`
    color:  ${p=>p.theme.color.white};
    position: absolute;
    right: 20px;
    bottom: -3px;
  `,
  CloseContainer: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    opacity: 1;
    border-radius: 20px;
    border-color: white;
    position: absolute;
    align-items: center;
    justify-content: center;
    right: 0px;
    top: 0px;
    height: 40px;
    width: 40px;
    zIndex: 1;
  `,
  CloseIcon: styled(Icon).attrs(p=>({
    name:'close',
    color: p.theme.color.white,
    size: 25,
  }))`
  `,
}

export const Buttom = {
  MyList: styled(Buttoms.MyList).attrs({
    row: true
  })`
    width:100px;
    position: absolute;
    top: 75px;
    left: 240px;
    zIndex: 1;
  `,
  Ver: styled(Buttoms.Ver).attrs({
    row: true
  })`
    position: absolute;
    top: 119px;
    left: 240px;
    width: 100px;
    zIndex: 1;
  `,
}
