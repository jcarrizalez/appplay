import React,{useState, useEffect} from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList
} from 'react-native'

const window = Dimensions.get("window")
const screen = Dimensions.get("screen")

const styles = StyleSheet.create({
  columnWrapperStyle:{
    alingItems:'center',
    justifyContent: 'flex-start',
  }
})

export default ({
  data, 
  component, 
  use = 'window',
  style = {},
  cardWidth = 120, 
  cardHeight = 162, 
  margin = 10, 
  padding = 4,
  onScroll,
  onEndReached,
  headerComponent = null,
  footerComponent = null
}) => {

  const [dimensions, setDimensions] = useState({ window, screen, date:new Date().getTime() })
  
  const { width, height } = dimensions[use]

  const date = dimensions.date

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => setDimensions({ window, screen, date:new Date().getTime() })
    )
    return () => subscription?.remove()
  });

  let calcWidth;
  let calcHeight;

  for (var i = 300 - 1; i >= 0; i--) {

    let valueWidth = (width - margin) / i

    if((valueWidth >= cardWidth) && calcWidth===undefined){
      calcWidth = {
        value: valueWidth,
        rows: i
      }
    }
    let valueHeight = (height - 20) / i
    if((valueHeight >= cardHeight) && calcHeight===undefined){
      calcHeight = {
        value: valueHeight,
        rows: i
      }
    }
  }

  const myWidth = calcWidth.value
  //const myHeight = calcHeight.value
  const myHeight = cardHeight

  return <Flat 
    id={date}
    data={data}
    style={style}
    padding={padding}
    myWidth={myWidth}
    myHeight={myHeight}
    onScroll={onScroll}
    onEndReached={onEndReached}
    component={component}
    numColumns={calcWidth.rows}
    headerComponent={headerComponent}
    footerComponent={footerComponent}
  />
}

const Flat = props => {
  
  const padding = props.padding

  const Component = props.component
  
  const Separator = () => <View style={{
    width:'100%',
    height:padding
  }}/>

  const renderItem = ({item}) => 
    <Component
      item={item}
      style={{
        width:(props.myWidth - padding),
        height: (props.myHeight - padding), 
        marginBottom:padding,
        marginLeft:padding,
        //marginLeft:keyColumn===0?0:padding, 
      }}
    />

  return(
    <FlatList
      key={props.id}
      data={props.data}
      style={props.style}
      initialNumToRender={20}
      enableEmptySections={true}
      numColumns={props.numColumns}
      //onScroll={props.onScroll}
      onEndReached={props.onEndReached}
      ListHeaderComponent={props.headerComponent??Separator}
      ListFooterComponent={props.footerComponent??Separator}
      keyExtractor={(item, index) => index}
      columnWrapperStyle={styles.columnWrapperStyle}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      //onEndReached={()=>null}
      showsHorizontalScrollIndicator={false}

      removeClippedSubviews={false}

      //onScrollBeginDrag={onScroll}
      //ItemSeparatorComponent={ItemSeparatorView}
      //ListEmptyComponent={()=><Text>xxxxxxxxxxxxxxx</Text>}
    />
  )
}
