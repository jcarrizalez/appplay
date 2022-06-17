import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import View from './View'
import {crtl, navigator} from 'services'

import {CONTENT_RELATED} from '~/endpoints'


function Related({data:{uuid, description1}})
{
  const [load, setMounted] = useState(crtl.onMounted(`related`))
  
  const [related, setRelated] = useState({})

  const onContentInfo = useCallback(function({item}){

    if(load.status()) return
    load.start()

    navigator('ContentInfo', item.uuid)
    load.end() 
  },[])

  const onLoad = useCallback(async function(){

    let response = await CONTENT_RELATED(uuid)

    if(response && load.isMounted()) setRelated(response) 
  },[])

  useEffect(() => {

    if(description1) onLoad()

  },[description1])

  useEffect(() => {
    //return () => setMounted(load.onUnMounted())
  },[])


  return <View.Related data={related} onContentInfo={onContentInfo}/>
}

Related.propTypes = {
}
export default Related
