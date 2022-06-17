import React from 'react'
import PropTypes from 'prop-types'
import {Header} from '~/components'
import {Banner} from './styles'

const ViewBanner = ({watchlater, genres, info, movies, height, headerTranslateY, imageTranslateY, actionsOpacity, onContentInfo, onWatchlater, onContentSearchGenres, id, setId}) => (
  <Banner.Container height={height} style={headerTranslateY}>
    <Banner.Header height={height} style={imageTranslateY}>
      <Banner.Feedback onPress={()=> setId(Math.floor(Math.random() * (23 - 0 + 1)) + 0)}>
        <Banner.Image height={height} source={movies.contents[id].image}/>
      </Banner.Feedback>
      <Banner.GradientTop />
    </Banner.Header>

    <Banner.GradientFooter>
      <Banner.Actions style={actionsOpacity}>
        {genres?.map((item, key) => (
          <React.Fragment key={key}>
            {0!==key
              ? <Banner.Point />
              : null
            }
            <Banner.GenreTouch onPress={() => onContentSearchGenres(item)}>
              <Banner.Genre>{item.name}</Banner.Genre>
            </Banner.GenreTouch>
          </React.Fragment>
        ))}
        <Banner.BtMyList check={watchlater} onPress={onWatchlater} />
        <Banner.BtInfo onPress={()=> onContentInfo({item:info})}/>
      </Banner.Actions>
    </Banner.GradientFooter>
  </Banner.Container>
)

ViewBanner.propTypes = {
  height: PropTypes.number.isRequired,
  actionsOpacity: PropTypes.object.isRequired,
  imageTranslateY: PropTypes.object.isRequired,
  headerTranslateY: PropTypes.object.isRequired,
}

export default ViewBanner