import React from 'react'
import PropTypes from 'prop-types'
import {Channel} from './styles'
import {contents, onUnique} from 'lib'
import {Header, Publicity} from '~/components'

const View = ({loading, data, onBlockId, onContentInfo, height = 250}) => (
  <Channel.Container>
    <Channel.Top>
      <Header.Buttoms />
    </Channel.Top>
      <Channel.TitleGradient>
        <Channel.TitleView>
          <Channel.Loading loading={loading}/>
          <Channel.TitleText loading={loading} data={data}/>
        </Channel.TitleView>
       </Channel.TitleGradient>
    <Channel.ImageContainer style={[{height}]}>
      <Channel.Background>
        <Channel.Fanart height={height} fanart={data.img_detail} />
      <Channel.ImageTop />
      </Channel.Background>
    </Channel.ImageContainer>

    <Channel.GridGradient />
    <Channel.Grid
        onEndReached={onBlockId}
        //onScroll={e =>console.log(e)}
        data={contents.get(onUnique(data.elements??[]))}
        headerComponent={()=>(
          <>
          <Channel.DescriptionData data={data} />
          <Publicity.Channel/>
          </>
        )}
        footerComponent={Channel.Footer}
        component={({item, style}) => (
          <Channel.GridTouchCover onPress={()=> onContentInfo(item)}>
            <Channel.GridCover image={item.portrait}  style={style} />
          </Channel.GridTouchCover>
        )}
      />
  </Channel.Container>
)

View.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onBlockId: PropTypes.func.isRequired,
  onContentInfo: PropTypes.func.isRequired,
}
export default View
