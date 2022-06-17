import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'
import Icon from '~/components/Icon'
import Buttoms from '~/components/Buttom'
import RBSheet from "react-native-raw-bottom-sheet"
import Slider from '@react-native-community/slider'

export const Crtl = {
  Container: styled.View`
    width: 100%;
    height: 525px;
    align-items: center;
    justify-content: flex-start;
  `,
  Title: styled.Text.attrs(({data}) => ({
    numberOfLines:1,
    children:data?.title
  }))`
    color: ${p=>p.theme.color.lightGrey};
    font-weight: bold;
    font-size: 20px;
  `,
  ImageContainer: styled.View`
    position: absolute;
    top: -25px;
    height: 550px;
    width: 100%;
    border-top-left-radius: 10px;
    padding: 0 2px;
    z-index: 0;
  `,
  Image: styled.Image.attrs(({data}) => ({
    resizeMode: 'cover',
    source:{uri:data.portrait},
  }))`
    height: 550px;
    width:100%;
    opacity: 0.05;
    border-top-left-radius: 10px;
  `,
  CastContainer: styled.TouchableOpacity`
    position: absolute;
    bottom: 40px;
    height: 40px;
    padding: 0 20px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
  `,
  CastIcon: styled(Icon).attrs({
    name:'cast-connected',
    size: 20,
  })`
    color: ${p=>p.theme.color.lightGrey};
  `,
  CastName: styled.Text.attrs(({device}) => ({
    numberOfLines:1,
    children: `desconectar de ${device.friendlyName? device.friendlyName : `desconocido`}`
  }))`
    color: ${p=>p.theme.color.lightGrey};
    font-size: 14px;
    left: 5px;
    top: 1px;
  `,
  Slider: styled.View`
    height: 400px;
    width: 100%; 
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    bottom: 100px;
  `,
   TimeContainer: styled.View`
    alignItems: flex-start;
    justifyContent: center; 
    height: 20px;
    width: 100%;
    flex-direction: row;
  `,
  TimeLeft: styled.Text.attrs({
    numberOfLines:1
  })`
    color: ${p=>p.theme.color.lightGrey};
    box-shadow: 1px 0.5px 0.5px black;
    position: absolute;
    left: 20px;
  `,
  TimeRight: styled.Text.attrs({
    numberOfLines:1
  })`
    color: ${p=>p.theme.color.lightGrey};
    box-shadow: 1px 0.5px 0.5px black;
    position: absolute;
    right: 20px;
  `,
  ViewSlider: styled.View`
    align-items: center;
    justifyContent: center;
    height: 50px;
    width: 100%;
    padding: 0 30px;
  `,
  PlayerSlider: styled(Slider).attrs(p=>({
    maximumTrackTintColor:'#E0E0E339',
    thumbTintColor: p.theme.color.orange,
    minimumTrackTintColor: p.theme.color.orange,
  }))`
    width: 100%;
    height: 100%;
  `,
  Actions: styled.View`
    alignItems: center;
    justifyContent: space-around; 
    height: 140px;
    width: 100%;
    flex-direction: row;
    padding: 0 20px;
  `,
  ActionTouch: styled.TouchableOpacity.attrs({
    activeOpacity:1
  })`
    height: ${p=>p.play? 120: 60}px;
    width: ${p=>p.play? 120: 60}px;
    border-radius: ${p=>p.play? 60: 30}px;
    align-items: center;
    justify-content: center;
  `,
  Replay30: styled(Icon).attrs({
    name:'replay-30',
    size: 30,
  })`
    color: ${p=>p.theme.color.lightGrey};
  `,
  Play: styled(Icon).attrs(p=>({
    name:p.pause? `play-arrow` : `pause`,
    size: 100,
  }))`
    color: ${p=>p.theme.color.lightGrey};
  `,

  Stop: styled(Icon).attrs({
    name:'stop',
    size: 40,
  })`
    color: ${p=>p.theme.color.lightGrey};
  `,
  VolumeView: styled.View`
    align-items: center;
    justifyContent: center;
    height: 50px;
    width: 200px;
    padding: 0 30px;
    flex-direction: column;
  `,
    //position: absolute;
    //top: -20px;
  VolumeText: styled.Text.attrs({
    numberOfLines:1,
    children: `Volumen`
  })`
    font-size: 12px;
    color: ${p=>p.theme.color.lightGrey};
    box-shadow: 1px 0.5px 0.5px black;
    bottom: 10px;
  `,
  VolumeSlider: styled(Slider).attrs(p=>({
    maximumTrackTintColor:'#E0E0E339',
    thumbTintColor: p.theme.color.lightGrey,
    minimumTrackTintColor: p.theme.color.lightGrey,
    vertical: true
  }))`
    width: 100%;
  `,
  Tracks: styled.View`
    width: 100%;
    height: 120px;
    padding: 5px 20px 0 20px;
    flex-direction: row;
    justify-content: space-around;
  `,
  TrackRow: styled.View`
    width: 50%;
    align-items: center;
  `,
  TrackSubtitles: styled.Text.attrs({
    numberOfLines:1,
    children: `Subtitles:`
  })`
    font-size: 17px;
    color: ${p=>p.theme.color.lightGrey};
    box-shadow: 1px 0.5px 0.5px black;

  `,
  TrackAudios: styled.Text.attrs({
    numberOfLines:1,
    children: `Audios:`
  })`
    font-size: 17px;
    color: ${p=>p.theme.color.lightGrey};
    box-shadow: 1px 0.5px 0.5px black;
  `,
}

export const Info = {
  Container: styled.View`
    width: 100%;
    height: auto;
    top: 5px;
    position: absolute;
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
    background-color: red;
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
  Device: styled.Text.attrs(({device}) => ({
    numberOfLines:1,
    children:`Transmitiendo a: ${device.friendlyName??`desconocido` }`
  }))`
    color: ${p=>p.theme.color.lightGrey};
    font-size: 16px;
    position: absolute;
    top: 190px;
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
  Disconect: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    height: 40px;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: absolute;
    top: 270px;

  `,
  Buttom: styled.View`
    height: 35px;
    background-color: #00000099;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    border-color: gray;
    border-width: 0.5px;
    border-radius: 5px;
    display: ${p=>p.active? `flex`: `none`};
  `,
  ButtomText: styled.Text.attrs(({state}) => ({
    numberOfLines:1,
    children: state===`connecting`? `CONECTANDO...`:`DESCONECTAR`
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 18px;
    text-align: center;
    width: 100%;
  `,
  ViewSlider: styled.View`
    align-items: center;
    justifyContent: center;
    flex:1;
    width: 100%;
    height: 100%;
  `,
  ViewTime: styled.View`
    alignItems: flex-start;
    justifyContent: center; 
    height: 100%;
    width: 75px;
    paddingLeft: 5px;
  `,
  TextTime: styled.Text.attrs({
    numberOfLines:1
  })`
    color: white;
    box-shadow: 1px 0.5px 0.5px black;
   

  `,
  PlayerSlider: styled(Slider).attrs(p=>({
    maximumTrackTintColor:'#E0E0E339',
    thumbTintColor: p.theme.color.orange,
    minimumTrackTintColor: p.theme.color.orange,
  }))`
    width: 100%;
    background-color: gren;
    height: 100px;
  `,
  Slider: styled.TouchableOpacity`
    height: 100px;
    width: 100%; 
    flex-direction: row;
    padding-left: 10px;
    z-index: 1;
    align-items: center;
    justify-content: center;

  `,
  TestView: styled.View`
    position: absolute;
    height: 150px;
    left: 230px;
    top: 50px;
  `,
  Test: styled.Text`
    color: white;
    padding-top: 20px;
  `,
}

export const Devices = {
  Container: styled.View`
    width: 100%;
    position: absolute;
    bottom: 54px;
    height: ${p=>p.height? p.height: 110}px;
  `,
  Touch: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    height: 100%;
    align-items: center;
    flex-direction: row;
  `,
  Item: styled.View`
    height: 40px;
    padding: 0 10px;
    flex-direction: row;
    justify-content: space-between;
  `,
  Name: styled.Text.attrs(p => ({
    numberOfLines:1,
    children: p.device.friendlyName??`desconocido`
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 18px;
    padding-left: 10px;
  `,
  Model: styled.Text.attrs(p => ({
    numberOfLines:1,
    children: p.device.modelName??``
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 8px;
    position: absolute;
    bottom: 2px;
    left: 35px;    
  `,
  Buttom: styled.View`
    height: 35px;
    background-color: #00000099;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    border-color: gray;
    border-width: 0.5px;
    border-radius: 5px;
    display: ${p=>p.active? `flex`: `none`};
  `,
  ButtomText: styled.Text.attrs(({state}) => ({
    numberOfLines:1,
    children: state===`connecting`? `CONECTANDO...`:`DESCONECTAR`
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 18px;
    text-align: center;
    width: 100%;
  `,
  Title: styled.Text.attrs(({cant}) => ({
    numberOfLines:1,
    children: `${cant===0?`no hay ` : ``} dispositivos`
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 20px;
    text-align: center;
    width: 100%;
    padding: 0 0 10px 0;
  `,
  ScrollView: styled.ScrollView`
    height: 100px;
    width: 100%;
  `,
}

export const Sheet = {
  Container: styled(RBSheet).attrs(p=>({
    height:p.height??300,
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
  ViewB: styled.View`
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
    name:'settings',
    color: p=>p.theme.color.white,
    size: 19,
  })`
    color: ${p=>p.theme.color.white};
    position: absolute;
    left: 20px;
  `,
  FooterCenter: styled.Text.attrs({
    children:'usar driver nativo',
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
    border-radius: 20px;
    position: absolute;
    align-items: center;
    justify-content: center;
    right: 0px;
    top: 0px;
    height: 40px;
    width: 40px;
  `,
  CloseIcon: styled(Icon).attrs(p=>({
    name:'close',
    color: p.theme.color.white,
    size: 25,
  }))`
  z-index: 0;
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
