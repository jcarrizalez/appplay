import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {navigator} from 'lib'
import {useCastState} from 'react-native-google-cast'
import {Buttom} from './styles'

function Buttoms({serviceContent, serviceUser, username,data:{uuid, title, watchlater, description2}})
{
  const isCast = useCastState() === `connected`

  const [check, setCheck] = useState(watchlater)

  const [loadingCheck, setLoadingCheck] = useState(false)

  const onLogin = useCallback(() => navigator('Login', {}))

  const onPlay = useCallback( () => serviceContent.play({
    uuid, title, useNavigator:true, isCast
  }),[isCast])

  const onWatchlater = useCallback( async function() {

    setLoadingCheck(true)

    let response = await serviceUser.watchlater(uuid, check)

    if(!serviceUser.isMounted()) return

    setLoadingCheck(false)

    if(response) setCheck(response.watchlater)

  },[check])

  if(!description2) return null

  return (
    <>
      {username
        ? <Buttom.MyList loading={loadingCheck} check={check} onPress={onWatchlater} />
        : <Buttom.Login onPress={onLogin} />
      }
      <Buttom.Ver onPress={onPlay} isCast={isCast} />
    </>
  )
}

Buttoms.propTypes = {
  uuid: PropTypes.string,
  watchlater: PropTypes.bool,
  description2: PropTypes.string,
}

export default Buttoms
