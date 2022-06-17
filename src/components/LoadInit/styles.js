import styled from 'styled-components/native';
//import { SafeAreaView } from 'react-navigation';
//import { RectButton } from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native'

export const Container = styled.View`
  background-color: ${p=>p.theme.color.backgroundPrimary};
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const Indicator = styled(ActivityIndicator).attrs(p=>({
  color: p.theme.color.orange,
}))`
`

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  align-self: center;
  height: 150px;
  width: 150px;
  margin-top: 30%;
  margin-bottom: 20%;
`;

export const SendButton = styled.TouchableOpacity.attrs({
    activeOpacity: 1,
    activeOpacity:0.7
  })`
  width: 200px;
  border: ${props => props.load===null? 0 : 0.5}px solid ${p=>p.theme.color.lightGrey};
  border-radius: 10px;
  margin: 25px 0;
`;

export const Wave = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const Text = styled.Text`
  color: ${p => p.load===null? p.theme.color.backgroundPrimary : p.theme.color.white};
  font-size: 18px;
`;
