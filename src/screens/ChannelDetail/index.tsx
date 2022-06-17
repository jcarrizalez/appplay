import React, {useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import View from './View'
import styled from '~/components'
import {BLOCK_ID} from '~/endpoints'
import {navigator, crtl, nexPage} from 'services'


function ChannelDetail({route, theme})
{
  const [loading, setLoading] = useState(false)

  const [load, setMounted] = useState(crtl.onMounted(`channel`))
  
  const [params] = useState(route.params??{elements:[]})

  const [data, setData] = useState({
    ...params, 
    elements: params.elements.map(item => item.uuid)
  })

  const onContentInfo = useCallback(function(item: object){

    if(load.status()) return
    load.start()

    if(load.isMounted()) navigator('ContentInfo', item.uuid)
    
    load.end()

  },[])

  const onBlockId = useCallback(async function(loading, data){

    let page = nexPage(data.metadata)

    if(loading || !page) return

    setLoading(true)

    let response = await BLOCK_ID(data.id, {page})

    setLoading(false)

    if(response) setData({
      ...data,
      metadata: response.metadata, 
      elements: data.elements.concat(response.elements)
    })

  },[])

  useEffect(function(){
    return () => setMounted(load.onUnMounted())
  },[])

  return (
    <View 
      loading={loading} 
      data={data} 
      onBlockId={() => onBlockId(loading, data)}
      onContentInfo={onContentInfo}
      />
  )
}

ChannelDetail.propTypes = {
  route: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}
export default styled(ChannelDetail)