import React, { useState, useEffect, useCallback } from 'react';
import styled from '~/components';
import {redux} from 'lib'
import View from './View'
import ServiceUser from 'services/User'

function ProfileList({navigation, route, theme})
{
  const [serviceUser] = useState(new ServiceUser())

  const [p] = useState(route?.params??{})

  const {username} = theme.session.info_user
  
  const [state, setState] = useState({
    ...p,
    isselect: false,
    ismenu:p.ismenu??false,
    edit: p.isedit??false,
    old_edit: p.isedit??false,
  })

  const onInfoUser = useCallback(async function(data){

    let response = data ?? await serviceUser.info()

    if(!response || !serviceUser.isMounted()) return

    setState({...state, ...response})

  }, [state])

  const onEditView = useCallback( (edit: bool) => setState({...state, edit}), [state])

  const onEdit = useCallback((profile: object) => serviceUser.navigator('ProfileEdit',profile))

  const onBack = useCallback(function(use = false){
  
    const {username} = redux.get('info_user')
  
    if(!username) return serviceUser.navigator('goBack')

    serviceUser.refreshBlocksProfile()

  }, [])

  const onSelect = useCallback(async function(selected, profile_id){

    if(profile_id === selected){
      setState({...state, isselect: true})
      return serviceUser.navigator('goBack') 
    }

    let response = await serviceUser.changeProfile(selected)

    if(!response || !serviceUser.isMounted()) return
    
    setState({...state, isselect: true})

    serviceUser.navigator('goBack')

  }, [state])


  useEffect(() => {
    serviceUser.mounted()
    return () => serviceUser.unmounted()
  },[])

  useEffect(function(){

    if(username) onInfoUser()

    return () => onBack()

  },[username]) 

  useEffect(function(){

    const unsubscribe = redux.subscribe(function(){

      if(!redux.is('info_user')) return

      let response = redux.get('info_user')

        onInfoUser(response)

        if(!state.old_edit) onEditView(false)
        
        setState(response)
    })
    
    if(state.edit) onEditView(true)

    return () => unsubscribe()
  },[])

  return(
    <View 
      s={state}
      onEdit={onEdit}
      onSelect={onSelect}
      onEditView={onEditView}
      />
  )
}

export default styled(ProfileList)
