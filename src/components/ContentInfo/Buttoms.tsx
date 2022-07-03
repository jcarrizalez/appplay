import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Buttom} from './styles'
import fn from './functions'
import {withTheme} from 'styled-components/native'
import {useCastState} from 'react-native-google-cast'

function Buttoms({data:{uuid, title, watchlater}, onClose})
{
  const castState = useCastState() === `connected`

  const [check, setCheck] = useState(false)

  const [loadingCheck, setLoadingCheck] = useState(false)

  const onWatchlater = useCallback( () => fn.onWatchlater(uuid, check, setCheck, setLoadingCheck),
  [uuid, check])

  const onPlay = useCallback( () => fn.onPlay(castState, uuid, title, onClose),
  [castState, uuid, title])

  useEffect(() => setCheck(watchlater),
  [uuid, watchlater])

  return(
    <>
      <Buttom.MyList loading={loadingCheck} check={check} onPress={onWatchlater} />
      <Buttom.Ver onPlay={onPlay} castState={castState}  />
    </>
  )
}

Buttoms.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string,
  watchlater: PropTypes.bool,
}

export default withTheme(Buttoms)