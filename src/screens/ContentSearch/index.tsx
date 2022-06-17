import React,{ useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'
import styled from '~/components'
import {crtl, navigator, nexPage} from 'services'
import View from './View'
import {CONTENT_SEARCH, MY_LIST, CONTINUE_WATCHING} from '~/endpoints'

function ContentSearch({route, theme})
{
  const [load, setMounted] = useState(crtl.onMounted(`content_search`))

  const [loading, setLoading] = useState(false)
  
  const [data, setData] = useState(route?.params??{})

  const onEndReached = useCallback(async function(loading, data){

    let page = nexPage(data.metadata)

    if(loading || !page) return

    let response

    setLoading(true)

    if(data.my_list){
      response = await MY_LIST({page})
    }
    else if(data.continue_watching){
      response = await CONTINUE_WATCHING({page})
    }
    else{

      response = await CONTENT_SEARCH(data.criteria, {
        page, name: data.title, 
        slug: data.novedades ? undefined : data.slug
      })
    }

    if(!load.isMounted()) return

    setLoading(false)

    if(response) setData({
      ...data,
      metadata: response.metadata,
      elements: data.elements.concat(response.elements)
    })

  },[])

  const onContentInfo = useCallback(function(item: object){
    if(load.status()) return
    load.start()

    load.end()
    if(load.isMounted()) navigator('ContentInfo', item.uuid)

  },[])

  useEffect(function() {
    return () => {
      setMounted(load.onUnMounted())
      if(data.ismenu) navigator(`toggleDrawer`)
    }
  },[])

  return (
    <View
      data={data}
      onContentInfo={onContentInfo}
      onEndReached={()=>onEndReached(loading, data)}
    />
  )
}

ContentSearch.propTypes = {
  route: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default styled(ContentSearch)
