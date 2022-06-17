import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient'
import Slider from '@react-native-community/slider'
import { StyleSheet } from 'react-native';
import Icon from '~/components/Icon'
import Buttom from '~/components/Buttom'

export const Image2 = styled.Image`
`

export const ImageBackground2 = styled.ImageBackground.attrs({
  imageStyle:{
    resizeMode: "cover",
    width: 1800,
    height: 1020,
    top: -100,
    left: -100,
    position: 'absolute',
    zIndex: -1,
  }
})`
  width: 100%;
  height: 100%;
  //backgroundPosition: 10,
  position: absolute;
  zIndex: -1;
`


export const ControlsView = styled.View`
  flex: 1;
  background-color: transparent;
`

export const Top = styled.View`
  flex: 1;
  flex-direction: row;
`
export const GradientTop = styled(LinearGradient).attrs({
  start:{ x: 0, y: 0 },
  end:{ x: 0, y: 1 },
  locations:[0, 0.9],
  colors:['#00000099', 'transparent']
})`
  position: absolute;
  top: 0;
  height: 100%; 
  width: 100%; 
  flex-direction: row;
  padding-left: 30px;
`

export const Bottom = styled.View`
  flex: 1;
  flex-direction: row;
`


export const GradientBottom = styled(LinearGradient).attrs({
  start:{ x: 0, y: 0 },
  end:{ x: 0, y: 1 },
  locations:[0, 0.8],
  colors:['transparent', '#00000099']
})`
  position: absolute;
  top: 0;
  height: 100%; 
  width: 100%; 
  flex-direction: row;
  padding-left: 30px;
  padding-top: 30px;
`

export const Back = styled(Buttom.Back).attrs({
})`
  position: absolute; 
  left: 5px;
  bottom:0;
  box-shadow: 1px 1px 1px black;
`

export const PlayerSlider = styled(Slider).attrs({
})`
  width: 100%;
  opacity: 1;
`

export const ViewSlider = styled.View`
  align-items: center;
  justifyContent: center;
  flex:1;
  width: 100%;
  height: 100%;
`

export const ViewTime = styled.View`
  alignItems: flex-start;
  justifyContent: center; 
  height: 100%;
  width: 100px;
  paddingLeft: 10px;
`

export const TextTime = styled.Text.attrs({
  numberOfLines:1
})`
  color: white;
  box-shadow: 1px 0.5px 0.5px black;
`

export const ViewTop = styled.View`
  flex:1;
  height: 100%;
  align-items: center;
  justify-content: center;
  width:100%;
`

export const TextTitle = styled.Text.attrs({
  numberOfLines:1
})`
  color: white;
  box-shadow: 1px 0.5px 0.5px black;
  font-size: 16px;
  position: absolute;
  bottom: 13px;
`

export const CenterLeft = styled.View`
  flex:1;
  background-color: transparent;
  alignItems: center;
  justify-content: flex-start;
`
export const CenterRight = styled.View`
  flex:1;
  background-color: transparent;
  align-items: center;
  justify-content: flex-end;
`

export const CenterCenter = styled.View`
  flex:1;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`

export const Error = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`


export const IconPlay = styled(Icon).attrs( props =>({
  name: props.paused ? 'play-arrow' : 'pause',
  color: 'white',
  size:70
}))`
  box-shadow: 1px 1px 1px black;
`

export const TextError = styled.Text.attrs({
  numberOfLines:1
})`
  color: #f27474;
  padding-top: 10px;
`

export const IconDrawer = styled(Icon).attrs( props =>({
  name: props.isOpen ? 'subtitles-off' : 'subtitles',
  color: 'white',
  size:25
}))`
  bottom:2px;
  box-shadow: 1px 1px 1px black;
`

export const IconError = styled(Icon).attrs({
  name:'error-outline',
  color:'#f27474',
  size:40
})`
  box-shadow: 0.5px 0.5px 0.5px black;
`

export const Loading = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Control = styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  alignSelf: center;
  borderRadius: 50px;
`
export const ViewAction = styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  alignSelf: center;
  borderRadius: 50px;
  position: absolute;
  bottom: 10px;
  right: 40px
`

export const Thumbnail = {
  Container: styled.View`
    //backgroundColor: #00000099;
    width: 100%;
    height: 68px;
    position: absolute;
    bottom:80px;
    //borderTopWidth: 0.5px;
    //borderBottomWidth: 0.5px;
    //borderColor: orange;
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    

  `,
  Card: styled.View`
    backgroundColor: #00000099;
    width: ${props => props.cardWith || 0}px;
    height: 100%;
    borderWidth: 0.5px;
    borderColor: ${props => props.current? 'white' : 'grey'};
    position: absolute;
    left : ${props => props.position || 0}px;
    align-items: center;
    justify-content: center;
`
}

export default StyleSheet.create({
  AnimatedViewTop:{
    position:'absolute',
    top:0,
    backgroundColor:'transparent', 
    height: 60,
    width:'100%',
    flexDirection: 'row', 
    alignItems: 'stretch', 
    justifyContent: 'space-between', 
  },
  AnimatedViewCenter:{
    flex:1, 
    alignItems: 'center',  
    justifyContent: 'center', 
    flexDirection: 'row', 
    zIndex: -1,
  },
  AnimatedViewBottom:{
    position:'absolute',
    bottom:0,
    width:'100%',
    height:100, 
    flexDirection: 'row', 
    alignItems: 'stretch', 
    justifyContent: 'center', 
  }
})
