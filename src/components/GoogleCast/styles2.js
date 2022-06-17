import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  height: 129px;
  width:194px;
  border-radius: 2px;
`
export const BorderImage = styled.View`
  position: absolute;
  left: 10px;
  top: 25px;
  height: 130px;
  width:195px;
  border-radius: 2px;
  border-color: gray;
  border-width:0.5px;
  background-color: gray;
`

export const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: 160px;
  left: 10px;
`

export const AnioRating = styled.Text`
  color: gray;
  font-size:14px;
  position: absolute;
  top: 20px;
  left: 240px;
`

export const Duration = styled.Text`
  color: gray;
  font-size: 14px;
  position: absolute;
  top: 36px;
  left: 240px;
`

export const Description = styled.Text`
  color: white;
  font-size: 14px;
  position: absolute;
  top: 180px;
  width: 100%;
  padding: 10px;
`
export const Imdb = styled.View`
  height: 50px;
  width:200px;
  left:240px;
  top:54px;
  position: absolute;
  flex-direction: row;
`
export const TouchClose = styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  opacity: 1;
  border-radius: 15px;
  border-color: white;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 10px;
  top: 10px;
  height: 30px;
  width:30px;
`

export const Touch = styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
`

export const Footer = styled.TouchableOpacity.attrs({
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
`

export const LineHeader = styled.View`
  border-right-width: 0.3px;
  border-color: gray;
  height: 126px;
  width: 1px;
  position: absolute;
  top: 27px;
  left: 222px;
`

export const LineFooter = styled.View`
  border-top-width: 0.3px;
  borderColor: gray;
  height: 1px;
  bottom:30px;
  width: 100%; 
  position: absolute;
`

export const TextFooter = styled.Text`
  color: white;
  fontSize: 14px;
  bottom: 1px;
`

export const Container = styled.View`
  background-color: ${p=>p.theme.color.backgroundPrimary};
  position: absolute;
  top:0;
  width: 100%; 
  height: 100%; 
  zIndex:-1; 
  border-top-left-radius:12px; 
  border-top-right-radius:12px;
  border-color: gray; 
  border-width:0.8px;
  border-bottom-width:0;
`

export default StyleSheet.create({
  infoFooter:{
    color:'white',
    position:'absolute',
    left:20,
  },
  keywordFooter:{
    color:'white',
    right: 20,
    position:'absolute',
    bottom:-3
  }
});
