import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Buttom} from './styles'
import fn from './functions'
import {withTheme} from 'styled-components/native'

function Buttoms({data:{uuid, title, watchlater}, onClose})
{
  const [check, setCheck] = useState(false)

  const [loadingCheck, setLoadingCheck] = useState(false)

  const onWatchlater = useCallback( () => fn.onWatchlater(uuid, check, setCheck, setLoadingCheck),
  [uuid, check])

  const onPlay = useCallback( () => fn.onPlay(uuid, title, onClose),
  [uuid, title])

  useEffect(() => setCheck(watchlater),
  [uuid, watchlater])

  return(
    <>
      <Buttom.MyList loading={loadingCheck} check={check} onPress={onWatchlater} />
      <Buttom.Ver onPress={onPlay} />
    </>
  )
}

Buttoms.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string,
  watchlater: PropTypes.bool,
}

export default withTheme(Buttoms)