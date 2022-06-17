import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '~/components/Icon'

export const SafeAreaView = styled.SafeAreaView`
  justify-content: space-between;
  padding-left: 10px;
  width:100%;
  flex:1;
`
export const SectionA = styled.View`
  margin-top: 0;
  height: 80px;
`

export const SectionB = styled.View`
  margin-top: 50px;
  height: 100%;
`

export const Background = styled.Image.attrs( p =>({
  resizeMode: 'stretch',
  source:{uri:p.source}

}))`
  width: 100%;
  height: 100%;
  opacity: 0.04;
  position: absolute;
`
export const Info = {
  Title: styled.Text.attrs({
    numberOfLines:1
  })`
    color: white;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    position: absolute;
    top: 20px;
    left: 0;
  `,
  TimeIcon: styled(Icon).attrs({
    name:'access-time',
    color:'white',
    size: 15
  })`
    position: absolute;
    top: 51px;
    left: 0;
  `,
  TimeText: styled.Text.attrs({
    numberOfLines:1
  })`
    color: white;
    font-size: 14px;
    position: absolute;
    top: 50px;
    left: 20px;
  `
}

export const Audio = {
  Container: styled.View`
    padding-top: 25px;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 32px;
  `,
  Icon: styled(Icon).attrs({
    name:'audiotrack',
    color:'white',
  })`
    position: absolute;
    top: 0;
    left: 0;
  `,
  Text: styled.Text`
    color: white;
    font-size: 18px;
    position: absolute;
    margin: 4px 0 0 32px;
    font-weight: bold;
  `,
  TouchItem: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    margin: 10px 10px 0 0;
    border-color: ${p => p.active? 'orange' : 'white'};
    border-width: 0.5px;
    border-radius: 2px;
    padding: 5px 10px 5px 10px;
  `,
  Item: styled.Text`
    color: ${p => p.active? 'orange' : 'white'};
    font-size: 18px;
    font-weight: ${p => p.active? 'bold' : 'normal'};
  `,
}

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: black;
`

export const Subtitles = {
  Container: styled.View`
    padding-top: 25px;
    flex-direction: row;
    margin-bottom: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 32px;

  `,
  Icon: styled(Icon).attrs( props => ({
    name: props.exists?'subtitles':'subtitles-off',
    color:'white',
  }))`
    position: absolute;
  `,
  Text: styled.Text`
    color: white;
    font-size: 18px;
    position: absolute;
    top: 4px;
    left: 35px;
    font-weight: bold;
  `,
  TouchItem: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    margin: 10px 10px 0 0;
    border-color: ${p => p.active? 'orange' : 'white'};
    border-width: 0.5px;
    border-radius: 2px;
    padding: 5px 10px 5px 10px;
  `,
  Item: styled.Text`
    color: ${p => p.active? 'orange' : 'white'};
    font-size: 18px;
    font-weight: ${p => p.active? 'bold' : 'normal'};
  `,
}


/*
export const Font = {
  Container: styled.View`
    padding: 15px 0 0 0;
    flex-direction: column;
    margin-bottom: 30px;
    align-items: flex-end;
  `,
  Row: styled.View`
    flex-direction: row;
    align-items: flex-end;
    margin-top: 5px;

  `,
  Icon: styled(Icon).attrs({
    name: 'format-size',
    color:'white',
  })`
    position: absolute;
    top: 0;
    left: 0;
  `,
  Left: styled.Text`
    color: grey;
    font-size: 12px;
    bottom: 0px;
  `,
  Right: styled.View`
    flex:1;
    flex-direction: row;
    justify-content: space-between;
    align-items: space-between;
    padding: 0 5px 0 5px;
  `,
  Text: styled.Text`
    color: white;
    font-size: 18px;
    position: absolute;
    top: 4px;
    left: 35px;
    font-weight: bold;
  `,
  AspTouchItem: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    padding: 5px;
    border-color: orange;
    border-width: 0.5px;
    justify-content: flex-end;
    align-items: center;
  `,
  AspItem: styled.Text`
    color: ${p => p.active? 'orange' : 'white'};
    font-size: 18px;
    font-weight: ${p => p.active? 'bold' : 'normal'};
  `,
  SizeTouchItem: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    border-color: transparent;
    border-width: 0.5px;
    width: 38px;
    justify-content: flex-end;
    align-items: center;
  `,
  SizeItem: styled.Text`
    color: ${p => p.active? 'orange' : 'white'};
    font-size: ${p => p.number || 10}px;
    font-weight: ${p => p.active? 'bold' : 'normal'};
  `,
}
*/
export const Gradient = styled(LinearGradient).attrs({
  start:{ x: 0, y: 0 },
  end:{ x: 1, y: 1 },
  locations:[0, 0.50],
  colors:['#01255499', '#17202A'],
})`
  height: 100%;
  width: 100%;
`

export const Footer = styled.Text.attrs(p=>({
  children: p.theme.company.url_name
}))`
  fontSize: 16px;
  textAlign: center;
  color: grey;
  bottom:7px;
  left: 100px;
  position: absolute;
`