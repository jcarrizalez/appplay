import styled from 'styled-components/native'
import Buttoms from '~/components/Buttom'
import LinearGradient from 'react-native-linear-gradient'
import { Animated, TouchableNativeFeedback } from 'react-native'

export const Home = {
  Container: styled.View`
    background-color: ${p=>p.theme.color.backgroundPrimary};
  `,
  ScrollView: styled(Animated.ScrollView).attrs({
    scrollEventThrottle:16,
  })`
  `,
  Blocks: styled.View`
    top: 20px;
    padding-bottom:20px;
  `,
  TopBar: styled(Animated.View)`
    top: 0;
    position: absolute;
    height: 85px;
    width: 100%;  
    background-color: ${p=>p.theme.color.backgroundPrimary};
    borderBottomWidth:0.5px;
    borderColor: gray;
  `,
  Gradient: styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 1, y: 1 },
    locations:[0, 0.90],
    colors:[p.theme.color.backgroundPrimary, 'black'],
  }))`
  `,
  GradientBlocks: styled(LinearGradient).attrs(p=>({
    start:{ x: 0.8, y: 0 },
    end:{ x: 0, y: 1 },
    locations:[0, 0.90],
    colors:[p.theme.color.backgroundPrimary, 'transparent'],
  }))`
    height: 500px;
    width: 100%;
    position: absolute;
    top: -10px;
  `,
}

export const Banner = {
  Container: styled(Animated.View).attrs({
  })`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${p=>p.theme.color.backgroundPrimary};
    overflow: hidden;
    height: ${p => p.height}px;
  `,
  Header: styled(Animated.View).attrs({
  })`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    resizeMode: cover;
    height: ${p => p.height}px;
    display: flex;
    justifyContent: center;
    alignItems: center;
  `,
  Logo: styled.Image.attrs({
    resizeMode: 'contain',
  })`
    align-self: center;
    height: 150px;
    width: 150px;
    margin-bottom: 10%;
  `,

  Image: styled(Animated.Image).attrs(p => ({
    resizeMode: 'contain',
    source:{uri:p.source},
  }))`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    resizeMode: cover;
    height: ${p => p.height}px;
  `,
  Foorter: null,
  Feedback: styled(TouchableNativeFeedback)`
  `,
  GradientTop: styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 0, y: 1 },
    locations:[0, 0.90],
    colors:[p.theme.color.backgroundPrimary, 'transparent' ]
  }))`
    position: absolute;
    top: 0;
    height: 120px; 
    width:100%;
  `,
  GradientFooter: styled(LinearGradient).attrs(p=>({
    colors:['transparent', p.theme.color.backgroundPrimary]
  }))`
    position: absolute;
    top:450px;
    width: 100%;  
    z-index: 1;
  `,
  GenreTouch: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  `,
  Genre: styled.Text`
    color: ${p=>p.theme.color.white};
  `,
  Point: styled.Text.attrs({
    children:`.`
  })`
    color: ${p=>p.theme.color.lightGrey};
    font-size: 50px;
    top: 6px;
  `,
  Actions: styled(Animated.View).attrs({
  })`
    height: 100px;
    flexDirection: row;
    alignItems: flex-end;
    justifyContent: space-around;
    paddingLeft: 10px;
    paddingRight: 10px;
  `,
  BtMyList: styled(Buttoms.MyList).attrs({
    size:40,
  })`
    position: absolute; 
    bottom: 50px;
    left: 20px;
  `,
  BtInfo: styled(Buttoms.Info).attrs({
    size:40,
  })`
    position: absolute;
    bottom: 50px;
    right: 20px;
  `,
}
