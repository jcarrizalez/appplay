import React,{useState, useEffect, useCallback, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import {redux, contents, onUnique} from 'services'

import {CSearch} from './styles'
import styled, {Header} from '~/components'
import fn, {load} from './functions'
import Card from './Card'
import SearchBar from './SearchBar'

const {
   Container, Data, CarouselContainer, 
   CarouselData, TitleContent, PersonContainer, PersonData
} = CSearch

const state = {
  content: null,
  director:null,
  cast:null,
  tags:null,
}

function Search({navigation, route})
{
  const [novedades, setNovedades] = useState([])

  const [ishome] = useState(route?.params?.ishome??false)

  const [data, setData] = useState({
    text:'',
    ...state
  })

  const [isM, setMounted] = useState(load.onMounted({
    state:{ishome},
    navigation,
    setNovedades,
  }), [ishome])
  
  useEffect(() => {
    fn.onNovedades()
    
    return () => setMounted(load.onUnMounted())
  },[])

  useEffect(() =>
  {
    const unsubscribe = redux.subscribe( () =>
    {
      if(redux.is('search')) return setData(redux.get('search'))
    })

    return () => unsubscribe()

  },[])

  //useLayoutEffect(fn.useLayoutEffect, [])

  const HeaderComponent = useCallback( () => (
    <React.Fragment>
      {data.cast
        ? <PersonContainer>
            <PersonData title='Actores' data={data.cast} onPress={item => fn.onContentSearch(`stars`, item)}/>
          </PersonContainer>
        : null
      }
      {data.director
        ? <PersonContainer>
            <PersonData title='Directores' data={data.director} onPress={item => fn.onContentSearch(`directors`, item)}/>
          </PersonContainer>
        : null
      } 
      <TitleContent title={data.text} active={(data.content || novedades?.length>0)}/>
    </React.Fragment>
  ),[data, novedades])

  const FooterComponent = useCallback( () => {

    if(!data.content) return null

    let elements = []
    novedades.forEach(item => {

      if(data.content.indexOf(item) === -1){
        elements.push(item)
      } 
    })
    elements = contents.get(onUnique(elements))

    return(
      <CarouselContainer>
        <CarouselData
          data={{elements}}
          onPress={fn.onContentInfo} 
          onLongPress={fn.onPlay} 
          onScroll={()=>null} 
          />
      </CarouselContainer>
    )
},[data])

  var data_ = data.content
    ? contents.get(onUnique(data.content)) 
    : contents.get(onUnique(novedades))
  /*
  var total = s.content
    ? s.content.metadata.total
    : novedades.metadata.total
  */
  return (
    <Container>
      <SearchBar ishome={ishome} state={state}/>
      {/*
      <Progress 
        load={Math.round((data.length * 100) / total)} 
        />
      */}
      <Data 
        //onEndReached={onEndReached}
        data={data_}
        component={props => <Card {...props} onPress={fn.onContentInfo} onLongPress={fn.onPlay}/>}
        headerComponent={HeaderComponent}
        footerComponent={FooterComponent}
      />
    </Container>
  )
}

Search.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
}

export default styled(Search)
