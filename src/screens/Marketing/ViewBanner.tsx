import React from 'react'
import PropTypes from 'prop-types'
import {Header} from '~/components'
import {Banner} from './styles'

const ViewBanner = ({content:{metadata}, theme, genres, height, headerTranslateY, imageTranslateY, actionsOpacity, onContentInfo, onWatchlater, onContentSearch, onChangeContent}) => (
  <Banner.Container height={height} style={headerTranslateY}>
    <Banner.Header height={height} style={imageTranslateY}>
      <Banner.Feedback onPress={onChangeContent}>
        {metadata
          ? <Banner.Image height={height} source={metadata.portrait}/>
          : <Banner.Logo source={theme.logo} />
        }
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
            <Banner.GenreTouch onPress={() => onContentSearch('genres', item)}>
              <Banner.Genre>{item.name}</Banner.Genre>
            </Banner.GenreTouch>
          </React.Fragment>
        ))}
        {metadata
          ? <>
              <Banner.BtMyList check={metadata.watchlater} onPress={onWatchlater} />
              <Banner.BtInfo onPress={onContentInfo}/>
            </>
          :null
        }
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
