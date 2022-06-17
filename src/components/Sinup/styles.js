import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

const colors = {

}

export const Container = styled.SafeAreaView`
  backgroundColor: ${colors.primary};
`;

export const Title = styled.Text`
  color: white;
  fontSize: 40;
  fontWeight: bold;
  font-style: italic;
`;

export const Back = styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  position: absolute;
  top: 45;
  left: 20;
  z-index:1;
  paddingLeft: 12px;
  paddingTop: 6px;
  height: 40px;
  width:40px;
  border-radius: 20px;
`;

export const Row = styled.View`
  flexDirection: row;
  paddingLeft: 10;
  paddingRight: 10;
  marginTop:10;
`;

export const Column = styled.View`
  flexDirection: column;
  paddingLeft: 10;
  paddingRight: 10;
  marginTop:10;
`;

export const Related = styled.View`
  padding-top: 15;
`;

export const Casts = styled.View`
  padding-top: 10;
`;

export const Directors = styled.View`
  flex-direction: row;
  padding-left: 10;
  padding-right: 10;
`;

export const DirectorTitle = styled.Text`
  color: white;
  font-size: 18;
`;

export const DirectorItem = styled.Text`
  color: orange;
  font-size: 18;
  font-weight: bold;
`;

export const Country = styled.Text`
  color: orange;
  fontSize: 18;
  fontWeight: bold;
`;

export const Genre = Country

export const DescriptionTitle = styled.Text`
  color: white;
  fontSize: 18;
  fontWeight: bold;
`;

export const DescriptionData = styled.Text`
  color: white;
  fontSize: 14;
  paddingLeft: 5;
  paddingTop: 5px;
  textAlign: justify;
`;

export const Anio = styled.Text`
  color: white;
  font-size: 18;
`;

export const Tags = styled.Text`
  color: white;
  fontSize: 18;
  fontWeight: bold;
`;

export const Tag = styled.Text`
  color: white;
  marginLeft: 5;
  marginTop: 5;
  fontSize: 14;
`;

export default StyleSheet.create({
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    resizeMode: 'stretch',
    width: '100%',
  },
  topBar: {
    marginTop: 40,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title:{
    height:'100%', 
    width:'100%', 
    position:'absolute', 
    bottom: 0,
    zIndex: 1,
    justifyContent: 'flex-end',
    alignItems:'flex-start',
    paddingLeft: 10,
  },
  linearGradient1:{
    height:100, 
    width:'100%', 
    position:'absolute', 
    top: 0
  },
  linearGradient2:{
    height:100, 
    width:'100%', 
    position:'absolute', 
    bottom: 0
  }
})
