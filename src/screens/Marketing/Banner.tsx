import React,{useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import styled from '~/components'
import ViewBanner from './ViewBanner'
import fn from './functions'

import movies from '~/services/movies'

const info = {
   "anio":"2009",
   "description":"En el año 2019 el mundo es dominado por los vampiros. Pero cuando la reserva mundial de sangre humana empieza a acabarse, su futuro pronto correrá peligro. Sólo un científico se atreverá a hallar una solución.",
   "duration":"1h38 min",
   "fanarts":[
      "https://twimglevel3.cdnar.net/contents/92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers/thumbnails/fanart_1.jpg",
      "https://twimglevel3.cdnar.net/contents/92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers/thumbnails/fanart_2.jpg",
      "https://twimglevel3.cdnar.net/contents/92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers/thumbnails/fanart_3.jpg",
      "https://twimglevel3.cdnar.net/contents/92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers/thumbnails/fanart_4.jpg"
   ],
   "landscape":"https://twimglevel3.cdnar.net/contents/92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers/thumbnails/large_doble.jpg",
   "portrait":"https://twimglevel3.cdnar.net/contents/92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers/thumbnails/tv.jpg",
   "rating":"+16",
   "title":"Vampiros del día",
   "uuid":"92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers",
   "watchlater":false
}
const genres = [
  {slug:'drama', name:'Drama'},
  {slug:'accion', name:'Accion'},
  {slug:'suspenso', name:'Suspenso'},
  {slug:'cine-nacional', name:'Cine nacional'},
]

function BannerMarketing({height, headerTranslateY, imageTranslateY, actionsOpacity})
{
  const [key, setKey ] = useState(24)

  const [watchlater, setWatchlater ] = useState(false)

  const onWatchlater = useCallback( () => fn.onWatchlater(info.uuid, watchlater, setWatchlater),
  [watchlater])

  return(
    <ViewBanner
      id={key}
      setId={setKey}
      watchlater={watchlater}
      movies={movies}
      info={info}
      genres={genres}
      height={height}
      headerTranslateY={headerTranslateY}
      imageTranslateY={imageTranslateY}
      actionsOpacity={actionsOpacity}
      onContentInfo={fn.onContentInfo}
      onWatchlater={onWatchlater}
      onContentSearchGenres={fn.onContentSearchGenres}
      />
  )
}

BannerMarketing.propTypes = {
  height: PropTypes.number.isRequired,
  actionsOpacity: PropTypes.object.isRequired,
  imageTranslateY: PropTypes.object.isRequired,
  headerTranslateY: PropTypes.object.isRequired,
}

export default styled(BannerMarketing)