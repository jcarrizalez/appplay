import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {contents, onUnique} from 'lib'
import {Content} from './styles'

const {
  RelatedData, RelatedContainer
} = Content

function Related({serviceContent, data:{uuid, description1}})
{
  const [related, setRelated] = useState({})

  const onContentInfo = useCallback(({item}) => serviceContent.info(item.uuid))

  useEffect(() => {

    var time = 0
    function onLoad()
    {
      time = setTimeout(async() => {

        if(!description1 || !serviceContent.isMounted()) return

        let response = await serviceContent.related(uuid)

        if(!response || !serviceContent.isMounted()) return

        setRelated(response) 
      }
      , 100) // 0.1seg
    }

    onLoad()

    return () => clearTimeout(time)

  },[description1])

  if(!related?.elements) return null
  
  return (
    <RelatedContainer>
      <RelatedData
        data={{elements: contents.get(onUnique(related.elements))}}
        onPress={onContentInfo} 
        onLongPress={()=>null} 
        onScroll={()=>null} 
        />
    </RelatedContainer>
  ) 
}

Related.propTypes = {
}

export default Related
