import styled from 'styled-components/native'
import {ActivityIndicator, FlatList} from 'react-native'
import Image from '~/components/Image'
import Icon from '~/components/Icon'


/*
const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};
*/

//data={data}
//renderItem={renderItem}
//onEndReached={onScroll}
//onScrollEndDrag={()=>onScroll(id)}
//onScrollEndDrag={(e)=>console.log(e.target)}
//onTouchStart={() => console.log('onTouchStart')}  
//onTouchMove={() => console.log('onTouchMove')}  
//onTouchEnd={() => console.log('onTouchEnd')}  
//onScrollBeginDrag={() => console.log('onScrollBeginDrag')}
//onMomentumScrollBegin={() => console.log('onMomentumScrollBegin')} 
//onScrollEndDrag={() => console.log('onScrollEndDrag')} 
//onMomentumScrollEnd={() => console.log('onMomentumScrollEnd')} 
//onViewableItemsChanged={() => console.log('onViewableItemsChanged')} 
//pagingEnabled={true} 
//removeClippedSubviews={true}
//viewabilityConfig={VIEWABILITY_CONFIG}
//keyExtractor: (item, index) => index,

export const Carousel = {
  Item: styled.TouchableOpacity.attrs({
    activeOpacity:0.7,
  })`
    width: ${props => props.width? props.width+'px' : 'auto'};
    justify-content: center; 
    align-items: center;
  `,
  List: styled(FlatList).attrs({
    horizontal: true,
    initialNumToRender: 6,
    showsHorizontalScrollIndicator: false,
    enableEmptySections: true,
    numColumns: 1,
    onEndReachedThreshold: 0.5,
    
  })`
    padding: ${props => props.padding!==undefined? props.padding : 10}px;
  `,
  Top: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
  TopLeft: styled.Text`
    color: ${p => p.loading? p.theme.color.orange : p.theme.color.white};
    font-weight: bold;
    font-size: 17px;
    margin-left: 10px;
    padding-right: 10px;
  `,
  TopRight: styled(ActivityIndicator).attrs(p=>({
    size: 'small',
    color: p.theme.color.orange,
  }))`
    display: ${p => p.loading? 'flex' : 'none'};
    min-width: 5px;
    min-height: 5px
    top: 1px;
    right: 10px;
  `,
  Cover: styled.Image.attrs(p => ({
    resizeMode: 'contain',
    source:{uri:p.image},
  }))`
    height: 162px;
    width: 120px;
    border-radius: 2px;
    margin-right: 5px;
  `,
  Watching: styled.Image.attrs(p => ({
    resizeMode: 'contain',
    source:{uri:p.image},
  }))`
    height: 162px;
    width: 120px;
    border-radius: 2px;
    margin-right: 5px;
  `,
   IconPlay: styled(Icon).attrs({
    name: 'play-circle-outline',
    color: 'orange',
    size:30
  })`
    box-shadow: 0.5px 0.5px 0.5px black;
    position: absolute;
    bottom: 1px;
    left: 1px;
    opacity: 0.7;
  `,
  ProgressColor: styled.View`
    height: 2px;
    width: ${p => p.value??0}px;
    background-color: orange;
    position: absolute;
    bottom: 0;
    left:0;
    opacity: 0.7;
  `,
  ProgressBase: styled.View`
    height: 2px;
    width: 120px;
    background-color: grey;
    position: absolute;
    bottom: 0;
    opacity: 0.7;
  `,
}

export const Cast = {
  Item: Carousel.Item,
  List: Carousel.List,
  Top: Carousel.Top,
  TopLeft: Carousel.TopLeft,
  TopRight: Carousel.TopRight,
  Image: styled(Image).attrs(p => ({
    resizeMode: 'cover',
    source:{uri:p.image},
  }))`
    background-color: ${p=>p.theme.color.lightGrey};
    height: 100px;
    width: 100px;
    border-radius: 50px;
    margin-right: 5px;
    border-color: orange;
    border-width: 0px;
  `,
  Name: styled.Text.attrs({
     numberOfLines: 1
  })`
    color: ${p=>p.theme.color.white};
    font-weight: bold;
    font-size: 12px;
    max-width:100px;
  `,
}

export const Channel = {
  Item: Carousel.Item,
  Item: styled.TouchableOpacity.attrs({
    activeOpacity:0.7,
  })`
    width: ${p => p.width? p.width+'px' : 'auto'};
    justify-content: center; 
    align-items: center;
  `,
  List: Carousel.List,
  Container: styled.View`
    justify-content: flex-start;
    align-items: center;
    flex:1;
  `,
  Loading: styled(ActivityIndicator).attrs(p=>({
    size: 'large',
    color: p.theme.color.orange,
  }))`
    display: ${p => p.loading? 'flex' : 'none'};
    min-width: 5px;
    min-height: 5px
    position: absolute;
    top: 35px;
    left: 15px;
    zIndex: 1;
  `,
  Cover: styled.Image.attrs(p => ({
    resizeMode: 'contain',
    source:{uri:p.image},
  }))`
    height: 162px;
    width: 120px;
    border-radius: 2px;
    margin-right: 5px;
  `,
  Rows: styled.View`
    flex:1;
    flex-direction: row;
  `,
  ImageTouch: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    width: 244px;
    margin-left: 10px;
    margin-top: 0px;
    border-radius: 2px;
    border-color: ${p => p.loading? 'orange' : 'grey'};
    border-width: 0.5px;
  `,
  Image: styled.Image.attrs(p =>({
    resizeMode: 'cover',
    source:{uri:p.image}
  }))`
    width: 100%;
    height: 100%;
  `,
  LineTop: styled.View`
    height: 1px; 
    width: 100%;
    paddingLeft: 30px;
    paddingRight: 30px;
    margin-top: 15px;
    margin-bottom: 10px;
  `,
  LineBottom: styled.View`
    height: 1px; 
    width: 100%;
    paddingLeft: 30px;
    paddingRight: 30px;
    margin-top: 10px;
    margin-bottom: 15px;
  `,
  Line: styled.View`
    height: 0.5px; 
    width: 100%;
    background-color: ${p => p.loading? 'orange' : 'grey'};
  `,
}

export const Avatar = {
  Item: styled.TouchableOpacity.attrs({
    activeOpacity:0.7,
  })`
    width: 110px;
    justify-content: center; 
    align-items: center;
    height: 110px;
  `,
  List: styled(Carousel.List)`
    padding: 10px;
  `,
  Image: styled(Image).attrs(p => ({
    resizeMode: 'cover',
    source:{uri:p.image},
  }))`
    background-color: ${p=>p.theme.color.lightGrey};
    height: 100px;
    width: 100px;
    border-radius: 50px;
    margin-right: 5px;
    border-color: orange;
    border-width: 0px;
  `,
}

