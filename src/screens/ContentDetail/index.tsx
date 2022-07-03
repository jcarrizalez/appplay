import React, {useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Animated} from 'react-native'
import ViewContentDetail from './View'
import styled from '~/components'
import {animations} from 'config'
import ServiceContent from 'services/Content'
import ServiceUser from 'services/User'

function ContentDetail({route, theme})
{
  const {username} = theme.session.info_user

  const scrollY = useRef(new Animated.Value(0)).current;

  const [data, setData] = useState(route.params)

  const [serviceContent] = useState(new ServiceContent())

  const [serviceUser] = useState(new ServiceUser())

  const [related, setRelated] = useState(null)

  useEffect(() => {
    serviceContent.mounted()
    serviceUser.mounted()
    return () => {
      serviceContent.unmounted()
      serviceUser.unmounted()
    }
  })

  const onTags = useCallback( (selected: array, tags: array) => {

    if(selected.length === 0) return

    let {slug, name} = tags.find(tag => tag.name===selected[0]??null)

    serviceContent.search('tags', {slug, name})
  })

  const onContentSearch = useCallback( (type: string, {slug, name}) => serviceContent.search(type, {slug, name}))

  useEffect(() => {

    async function onLoad(){

      let {is_player, title, uuid} = data

      if(is_player && serviceContent.isMounted()) serviceContent.play({uuid, title})

      let response = await serviceContent.detail(uuid, title, useNavigator = false)

      if(response && serviceContent.isMounted()) setData(response)
    }
    onLoad()
  })

  return (
    <ViewContentDetail 
      data={data??{}}
      username={username}
      onTags={item => onTags(item, data?.tags)}
      onContentSearch={onContentSearch}
      animations={animations.ContentDetail(scrollY)}
      onScroll={Animated.event}
      serviceContent={serviceContent}
      serviceUser={serviceUser}
      >
    </ViewContentDetail>
  )
}

ContentDetail.propTypes = {
  route: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default styled(ContentDetail)
