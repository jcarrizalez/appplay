import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import TagGroup from 'react-native-tag-group'
import Buttoms from '~/components/Buttom'
import {View, Animated, ScrollView, TouchableNativeFeedback, Image} from 'react-native'
import {Block} from '~/components'


//p=>p.theme.color

export const Column = styled.View`
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  margin-top:10px;
`
export const Content = {
  Container: styled.View`
    background-color: ${p=>p.theme.color.backgroundPrimary};
    width: 100%;
    height: 100%;
  `,
  ScrollView: styled(Animated.ScrollView).attrs({
    scrollEventThrottle:16,
    showsVerticalScrollIndicator:false,
    persistentScrollbar:false,
  })`
    padding-top:20px;
  `,
  TitleGradient: styled(LinearGradient).attrs(p =>({
    start:{ x: 0, y: 0 },
    end:{ x: 0, y: 1 },
    locations:[0, 0.90],
    colors:['transparent', p.theme.color.backgroundPrimary ]
  }))`
    position: absolute;
    height: 60px;
    top: 195px;
    width: 100%;  
    zIndex: 1;
    opacity: 1;
  `,
  TitleView: styled(Animated.View)`
    height: 100%; 
    width: 100%; 
    position: absolute;
    bottom: 0;
    zIndex: 1;
    justifyContent: flex-end;
    alignItems: flex-start;
    paddingLeft: 10px;
  `,
  TitleText: styled.Text.attrs( p=>({
    numberOfLines: 1,
    children: p.data.title
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 25px;
    font-weight: bold;
    font-style: italic;
    width:100%;
  `,
  TagContainer: Column,
  TagTitle: styled.Text.attrs(p=>({
    children: p.data.tags? 'Temas ' : ' '
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 16px;
    font-weight: bold;
  `,
  TagGroup: styled(TagGroup).attrs(p=>({
    source: p.data.tags? p.data.tags.map(tag => tag.name):[],
    tagStyle:{
      backgroundColor: p.theme.color.backgroundPrimary,
      borderColor: p.theme.color.orange
    },
    textStyle:{
      color: p.theme.color.orange
    },
    activeTagStyle:{
      //backgroundColor: p.theme.color.orange
    },
    activeTextStyle:{
      //color: p.theme.color.backgroundPrimary,
    }
  }))`
    padding-top:10px;
  `,
  RelatedContainer: styled.View`
    padding-top: 15px;
  `,
  RelatedData: styled(Block.Carousel).attrs(({data}) =>({
    loading: false,
    item: {
      ...data,
      title: data?`Peliculas Similares`: ``
    }
  }))`
  `,
  CastsContainer: styled.View`
    padding-top: 10px;
  `,
  CastsData: styled(Block.Cast).attrs(({data}) =>({
     title: data?.actors?'Elenco' : '',
     data: data?.actors??[]
  }))`
  `,
  Info: styled.View`
    top: 15px;
  `,
  Anio: styled.Text.attrs(({data}) =>({
    children: data?.countries? ` ${data.anio}` : `Año: ${data.anio}`
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 16px;
  `,
  DescriptionContainer: Column,
  Description1: styled.Text.attrs({
    children: `Sinopsis`
  })`
    color:${p=>p.theme.color.white};
    font-size: 16px;
    font-weight: bold;
  `,
  Description2: styled.Text.attrs(({data}) =>({
    children: data?.description2? `Por que verla` : ``
  }))`
    color:${p=>p.theme.color.white};
    font-size: 16px;
    font-weight: bold;
  `,
  DescriptionData: styled.Text.attrs(({data,is2}) =>({
    children: is2? (data?.description2??``) : (data?.description1??data?.description)
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 14px;
    padding: 5px 0 0 5px;
    text-align: justify;
  `,
  Footer: styled.View`
    height: 50px;
  `,
  DirectorsTitle: styled.Text.attrs(({data}) => ({
    children: data?.directors? 'Dirigida por ' : ' '
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 16px;
    font-weight: bold;
  `,
  DirectorsContainer: styled.View`
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    margin-top:5px;
  `,
  GenresContainer: styled.View`
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    margin-top:5px;
  `,
  ButtomsContainer: styled.View`
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    margin-top:5px;
  `,
  CountryContainer: styled.View`
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    margin-top:5px;
  `,
  GenresItem: styled.Text.attrs(({name}) =>({
    children: name
  }))`
    color: ${p=>p.theme.color.orange};
    font-size: 16px;
    font-weight: bold;
  `,
  CountryItem: styled.Text.attrs(({name}) =>({
    children: name
  }))`
    color: ${p=>p.theme.color.orange};
    font-size: 16px;
    font-weight: bold;
  `,
  DirectorsItem: styled.Text.attrs(({name}) =>({
    children: name
  }))`
    color: ${p=>p.theme.color.orange};
    font-size: 16px;
    font-weight: bold;
  `,
  GenresText: styled.Text.attrs(({id}) =>({
    children: id!==0?', ':''
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 12px;
    top: 5px;
  `,
  CountryText: styled.Text.attrs(({id}) =>({
    children: id!==0?', ':''
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 12px;
    top: 5px;
  `,
  DirectorsText: styled.Text.attrs(({id}) =>({
    children: id!==0?', ':''
  }))`
    color: ${p=>p.theme.color.white};
    font-size: 12px;
    top: 5px;
  `,
  GenresTouch: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  `,
  CountryTouch: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  `,
  DirectorsTouch: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  `,
  ImageContainer: styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    backgroundColor: ${p=>p.theme.color.backgroundPrimary};
    overflow: hidden;
  `,
  ImageTop:  styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 0, y: 1 },
    locations:[0, 0.90],
    colors:[p.theme.color.backgroundPrimary, 'transparent' ],
  }))`
    position: absolute;
    top: 0;
    height: 120px; 
    width: 100%;
  `,
  ImageTouch: styled(TouchableNativeFeedback)`
  `,
  Background: styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: null;
    resizeMode: cover;
  `,
  Fanart: styled(Animated.Image).attrs( ({fanart}) =>({
    source:{uri:fanart},
  }))`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: null;
    resizeMode: cover;
    height: ${p => p.height}px;
  `,
  TopBar: styled(Animated.View)`
    top:0;
    position: absolute;
    height: 92px;
    width: 100%; 
    backgroundColor: ${p=>p.theme.color.backgroundPrimary};
    borderBottomWidth: 0.5px;
    borderColor: ${p=>p.theme.color.lightGrey};
  `,
}


export const Buttom = {
  Login: styled(Buttoms.Login).attrs({
    row: true
  })`
    width:130px;
    margin: 10px 0 5px 0px;
  `,
  MyList: styled(Buttoms.MyList).attrs({
    row: true
  })`
    width:100px;
    margin: 10px 0px 5px 0px;
  `,
  Ver: styled(Buttoms.Ver).attrs(p=>({
    row: true,
    iscast: p.isCast
  }))`
    width: 100px;
    margin: 10px 0px 5px 10px;
  `,
}



