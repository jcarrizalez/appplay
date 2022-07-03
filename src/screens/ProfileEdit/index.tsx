import React, {useState, useEffect, useCallback} from 'react'
import {Keyboard} from 'react-native'
import PropTypes from 'prop-types'
import styled from '~/components'
import View from './View'
import ServiceUser from 'services/User'

function ProfileEdit({navigation, route})
{
  const [serviceUser] = useState(new ServiceUser())

  const [p] = useState(route?.params??{})

  const [avatars, setAvatars] = useState(null)

  const [genders, setGenders] = useState([
    {label: 'Masculino', value: 'M'},
    {label: 'Femenino', value: 'F'}
  ])

  const [classs, setClasss] = useState(null)

  const [loading, setLoading] = useState(false)
 
  var [state, setState] = useState({
    openAvatars: false,
    openGender: false,
    openClass_: false,
    is_add:p.add? true : false,
    valueAvatarId:p.avatar_id,
    id: p.id??null,
    name: p.name,
    image: p.image,
    valueGender: p.gender,
    valueClass_: p.class_id,
  })

  const [gender, setGender] = useState(state.valueGender)
  state.valueGender = gender // por que no actualizaba coloque esto

  const [class_, setClass_] = useState(state.valueClass_)
  state.valueClass_ = class_ // por que no actualizaba coloque esto

  var [old, setOld] = useState(state)

  const onState = useCallback( function(type: string, value: string) {
    if(type === 'gender_open'){
      setState({...state, openAvatars: false, openGender: value, openClass_: false})
    }
    else if(type === 'gender_item'){
      setState({...state, openAvatars: false, openGender: false, openClass_: false, valueGender: value.value})
    }
    else if(type === 'class_open'){
      setState({...state, openAvatars: false, openGender: false, openClass_: value})
    }
    else if(type === 'class_item'){
      setState({...state, openAvatars: false, openGender: false, openClass_: false, valueClass_: value.value})
    }
    else if(type === 'avatars_open'){
      setState({...state, openAvatars: value})
    }
    else if(type === 'avatars_item'){
      setState({...state, openAvatars: false, valueAvatarId: `${value.id}` ,image: value.image})
    }
    else if(type === 'name'){
      setState({...state, openAvatars: false, name: value})
    }
    else if(type === 'keyboard'){
      setState({...state, openAvatars: false, openGender: false, openClass_: false})
    }
  }, [state])

  const onCloseKeyboard = useCallback( function(state) {
    Keyboard.dismiss()
    onState('keyboard')
  })

  const onSave = useCallback( async function() {

    if(state.is_add) return
    
    onCloseKeyboard(state)

    setLoading(true)

    let body = {
      name: state.name, 
      class_id: state.valueClass_, 
      gender: state.valueGender, 
      avatar_id: state.valueAvatarId, 
    }

    if(state.id){
      body.id = state.id
    }

    response = await serviceUser.profile(body)

    await serviceUser.info()

    if(serviceUser.isMounted()) setLoading(false)
    if(serviceUser.isMounted()) setOld(state)
    
  }, [state])


  useEffect(() => {
    serviceUser.mounted()
    return () => serviceUser.unmounted()
  },[])

  useEffect(() => {
    async function onLoad()
    {
      let response  = await serviceUser.class()
      if(response && serviceUser.isMounted()) setClasss(response)

      response = await serviceUser.avatar()
      if(response && serviceUser.isMounted()) setAvatars(response)
    }
    onLoad()
  },[])

  return (
    <View 
      s={state}
      onState={onState}
      onSave={onSave}
      onCloseKeyboard={onCloseKeyboard}
      avatars={avatars}
      gender={gender}
      genders={genders}
      class_={class_}
      classs={classs}
      setGender={setGender}
      setClass_={setClass_}
      active={(loading || avatars === null  || class_ === null)}
      distinct={(JSON.stringify(state) !== JSON.stringify(old))}
      old={old}
      />
  )
}

ProfileEdit.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default styled(ProfileEdit)
