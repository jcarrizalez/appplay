import React,{useState, useEffect, useCallback, useLayoutEffect} from 'react'
import {Keyboard} from 'react-native'
import PropTypes from 'prop-types'
import {redux, contents, onUnique} from 'lib'

import {CSearch} from './styles'
import styled, {Header} from '~/components'
import Card from './Card'
import SearchBar from './SearchBar'
import ServiceContent from 'services/Content'
import ServiceSearch from 'services/Search'

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
  const [serviceContent] = useState(new ServiceContent())
  const [serviceSearch] = useState(new ServiceSearch())
  
  const [novedades, setNovedades] = useState([])

  const [ishome] = useState(route?.params?.ishome??false)

  const [data, setData] = useState({
    text:'',
    ...state
  })

  const onContentInfo = useCallback( function (props){

    let item = props?.uuid? props : props?.item

    let uuid = item?.uuid

    if(ishome) serviceContent.info(uuid)
    else serviceContent.navigator('ContentDetail', item)

  },[])

  const onPlay = useCallback( ({item}) => serviceContent.navigator('ContentDetail', {...item, is_player: true}) )

  const onNovedades = useCallback( async function (){

    let novedades = redux.get('novedades')?.elements

    if(novedades) return setNovedades(novedades)

    response = await serviceContent.search('novedades', {count:60}, useNavigator = false)

    if(!response || !serviceContent.isMounted()) return 

    setNovedades(response?.elements??[])

    redux.push('novedades', response)
  
  },[])
  
  useEffect(() => {
    serviceContent.mounted()
    serviceSearch.mounted()
    return () => {
      serviceContent.unmounted()
      serviceSearch.unmounted()
    }
  },[])

  useEffect(() =>
  {
    onNovedades()

    const unsubscribe = redux.subscribe( () =>
    {
      if(!redux.is('search')) return

      let response = redux.get('search')

      if(response.text !== '') Keyboard.dismiss()

      setData(redux.get('search'))

    })

    return () => unsubscribe()

  },[])

  const HeaderComponent = useCallback( () => (
    <React.Fragment>
      {data.cast
        ? <PersonContainer>
            <PersonData title='Actores' data={data.cast} onPress={item => serviceContent.search(`stars`, item)}/>
          </PersonContainer>
        : null
      }
      {data.director
        ? <PersonContainer>
            <PersonData title='Directores' data={data.director} onPress={item => serviceContent.search(`directors`, item)}/>
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
          onPress={onContentInfo} 
          onLongPress={onPlay} 
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
      <SearchBar ishome={ishome} state={state} serviceSearch={serviceSearch}/>
      {/*
      <Progress 
        load={Math.round((data.length * 100) / total)} 
        />
      */}
      <Data 
        //onEndReached={onEndReached}
        data={data_}
        component={props => <Card {...props} onPress={onContentInfo} onLongPress={onPlay}/>}
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
