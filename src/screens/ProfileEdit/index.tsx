import React, {useState, useEffect, /*useCallback,*/} from 'react'
import PropTypes from 'prop-types'
import styled from '~/components'
import View from './View'
import fn, {load} from './functions'

function ProfileEdit({navigation, route})
{
  const [p] = useState(route?.params??{})

  const [avatars, setAvatars] = useState(null)

  const [genders, setGenders] = useState([
    {label: 'Masculino', value: 'M'},
    {label: 'Femenino', value: 'F'}
  ])

  const [classs, setClasss] = useState(null)

  const [loading, setLoading] = useState(false)
 
  var [s, setState] = useState({
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

  const [gender, setGender] = useState(s.valueGender)
  s.valueGender = gender // por que no actualizaba coloque esto

  const [class_, setClass_] = useState(s.valueClass_)
  s.valueClass_ = class_ // por que no actualizaba coloque esto

  var [old, setOld] = useState(s)

  const [isM, setMounted] = useState(load.onMounted({
    state:s,
    navigation,
    setOld, 
    setState,
    setClasss, 
    setAvatars,
    setLoading,
  }), [s])

  //const onCloseKeyboard = useCallback( () => fn.onCloseKeyboard(s), [s])

  useEffect(() => {
    fn.onLoad()
    return () => setMounted(load.onUnMounted())
  },[])

  var active = (loading || avatars === null  || class_ === null)

  var distinct = JSON.stringify(s) !== JSON.stringify(old)

  return (
    <View 
      s={s}
      onState={fn.onState}
      onSave={fn.onSave}
      onCloseKeyboard={fn.onCloseKeyboard}
      avatars={avatars}
      gender={gender}
      genders={genders}
      class_={class_}
      classs={classs}
      setGender={setGender}
      setClass_={setClass_}
      active={active}
      distinct={distinct}
      old={old}
      />
  )
}

ProfileEdit.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default styled(ProfileEdit)
