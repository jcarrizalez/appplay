import React, { useState, useEffect, useCallback } from 'react';
import styled from '~/components';
import {redux} from '~/services'
import fn, {load} from './functions'
import View from './View'

function ProfileList({navigation, route, theme})
{
  const [p] = useState(route?.params??{})

  const {username} = theme.session.info_user
  
  const [s, setState] = useState({
    ...p,
    isselect: false,
    ismenu:p.ismenu??false,
    edit: p.isedit??false,
    old_edit: p.isedit??false,
  })

  const [isM, setMounted] = useState(load.onMounted({
    state:s,
    navigation,
    setState,
  }), [s])
  
  useEffect(function(){

    if(username) fn.onInfoUser()

    return () => {

      setMounted(load.onUnMounted())
      
      fn.onBack()
    }

  },[username]) 

  useEffect(function(){

    const unsubscribe = redux.subscribe(function(){

      if(!redux.is('info_user')) return

      let response = redux.get('info_user')

        fn.onInfoUser(response)
        if(!s.old_edit) fn.onEditView(false)
        setState(response)
    })
    
    if(s.edit) fn.onEditView(true)

    return () => unsubscribe()
  },[])

  return(
    <View 
      s={s}
      onEdit={fn.onEdit}
      onSelect={fn.onSelect}
      onEditView={fn.onEditView}
      />
  )
}

export default styled(ProfileList)