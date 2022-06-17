import React from 'react'
import PropTypes from 'prop-types'
import {Header, Footer} from '~/components'
import {contents} from 'services'
import {CSearch, Data, Card} from './styles'

const ViewContentSearch = ({data:{title, elements, metadata:{total}}, onContentInfo, onEndReached}) => (
  <CSearch.Container>
    <Header.Container>
      <Header.Title title={title} />
      <Header.Buttoms />
    </Header.Container>
 
    <CSearch.Progress load={Math.round((elements.length * 100) / total)} />
    <Data 
      onEndReached={onEndReached}
      data={contents.get(elements)}
      component={props => (
        <ViewCard {...props} onPress={item=>onContentInfo(item)} />
      )}
      footerComponent={elements.length> 30 ? Footer : null}
    />
  </CSearch.Container>
)

ViewContentSearch.propTypes = {
  title: PropTypes.string,
  elements: PropTypes.array,
  total: PropTypes.number,
  onContentInfo: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
}

const ViewCard = ({item, style, onPress}) =>(
  <Card.TouchCover onPress={()=> onPress(item)}>
    <Card.Cover 
      item={item} 
      style={style}
    />
  </Card.TouchCover>
)

ViewCard.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default ViewContentSearch