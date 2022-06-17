import React,{useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import {View, Image} from 'react-native'
import {Channel} from './styles'
import {withTheme} from 'styled-components/native'

function BlockChannel({loading, onPress, onLongPress, onScroll, item}) 
{
  const renderItem = useCallback( ({item, index}) =>
  (
    <Channel.Item
      key={index}
      onPress={()=>onPress({item})}
      onLongPress={()=>onLongPress({item})}
      >
      <Channel.Cover image={item.portrait} />
    </Channel.Item>
  ), [onPress, onLongPress])

  return (
    <Channel.Container>
      <Channel.LineTop>
        <Channel.Line loading={loading}/>
      </Channel.LineTop>
      <Channel.Rows>
        <Channel.ImageTouch 
          onPress={()=>onPress({is_channel: true,item})}
          loading={loading}
          >
        <Channel.Image image={item.img_home} />
        </Channel.ImageTouch>
        <Channel.List
          data={[...item.elements].reverse()}
          renderItem={renderItem}
          onEndReached={onScroll}
          padding={0}
          style={{marginLeft: 6}}
          //inverted={true}
          scrollEnabled={false}
        />
      </Channel.Rows>
      <Channel.Rows style={{marginTop: 6}}>
        <Channel.List
          data={item.elements}
          renderItem={renderItem}
          onEndReached={onScroll}
          padding={0}
          style={{paddingLeft: 10}}
        />
      </Channel.Rows>
      <Channel.Loading loading={loading}/>
      <Channel.LineBottom>
        <Channel.Line loading={loading}/>
      </Channel.LineBottom>
    </Channel.Container>
  )
}

export default withTheme(BlockChannel)
