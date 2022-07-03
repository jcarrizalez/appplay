import React, {useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import View from './View'
import styled from '~/components'
import {nexPage} from 'lib'

import ServiceBlock from 'services/Block'
import ServiceContent from 'services/Content'

function ChannelDetail({route, theme})
{
  const [serviceBlock] = useState(new ServiceBlock())

  const [serviceContent] = useState(new ServiceContent())

  const [loading, setLoading] = useState(false)

  const [params] = useState(route.params??{elements:[]})

  const [data, setData] = useState({
    ...params, 
    elements: params.elements.map(item => item.uuid)
  })
  
  useEffect(() => {
    serviceBlock.mounted()
    serviceContent.mounted()
    return () => {
      serviceBlock.unmounted()
      serviceContent.unmounted()
    }
  },[])

  const onContentInfo = useCallback((item: object) => serviceContent.info(item.uuid) )

  const onBlockId = useCallback(async function(loading, data){

    let page = nexPage(data.metadata)

    if(loading || !page || !serviceBlock.isMounted()) return

    setLoading(true)

    let response = await serviceBlock.find(data.id, {page})

    setLoading(false)

    if(!response || !serviceBlock.isMounted()) return

    data.metadata = response.metadata
    data.elements = data.elements.concat(response.elements)

    setData(data)

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