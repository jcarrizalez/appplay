import React,{useCallback} from 'react'
import PropTypes from 'prop-types'
import {Carousel} from './styles'

import {View, Image} from 'react-native'
import {withTheme} from 'styled-components/native'

function Watching({item})
{
  let value = ((120 * item.progress) / 100)
  value = Math.floor(Math.random() * 120)

  return (
    <>
    <Carousel.Watching image={item.portrait} />
    <Carousel.IconPlay />
    <Carousel.ProgressBase />
    <Carousel.ProgressColor value={value}/>
    </>
  )
}

const MyList = ({item}) => <Carousel.Cover image={item.portrait} />

const Cover = ({item:{portrait}}) => <Carousel.Cover image={portrait} />


function BlockCarousel({loading, onPress, onLongPress, onScroll, item:{slug, title, elements}}) 
{
  const renderItem = useCallback( ({item, index}) =>
  {
    const is_watching = slug === 'estas_viendo'
    const is_mylist   = slug === 'mi_lista_mix'

    return (
      <Carousel.Item
        key={index}
        onPress={()=>onPress({is_watching, is_mylist, item})}
        onLongPress={()=>onLongPress({is_watching, is_mylist, item})}
      >
        {is_watching
          ? <Watching item={item} />
          : is_mylist
            ? <MyList item={item} />
            : <Cover item={item} />
        }
      </Carousel.Item>
    )
  }, [slug, onPress, onLongPress])

  if(elements?.length === 0) return null

  return (
    <>
    <Carousel.Top>
      <Carousel.TopLeft loading={loading}>{title}</Carousel.TopLeft>
      <Carousel.TopRight loading={loading}/>
    </Carousel.Top>
      <Carousel.List
        data={elements}
        renderItem={renderItem}
        onEndReached={onScroll}
      />
    </>
  )
}

BlockCarousel.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  elements: PropTypes.array,
  onScroll: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
}

export default withTheme(BlockCarousel)