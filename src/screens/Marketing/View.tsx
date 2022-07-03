import React from 'react'
import PropTypes from 'prop-types'
import {Header, Footer, ContentInfo} from '~/components'
import Banner from './Banner'
import Block from './Block'
import {Home} from './styles'

const {Container, ScrollView, Blocks, TopBar, Gradient/*, GradientBlocks*/} = Home

const View = ({serviceContent, serviceBlock, serviceUser, animations:{headerOpacity, actionsOpacity, nativeEvent, HEADER_MAX_HEIGHT, contentContainerStyle, headerTranslateY, titleTranslateY, imageTranslateY}, data, theme, onScroll}) => (
  <Container>
    <ScrollView
        contentContainerStyle={contentContainerStyle}
        onScroll={onScroll(nativeEvent, {useNativeDriver: true})}
      >
      <Blocks>
        {/*<GradientBlocks />*/}
        {data?.elements.map((block, key) => <Block key={key} item={block} position={key} serviceContent={serviceContent} serviceBlock={serviceBlock}/> )}
      </Blocks>

      <Banner 
        serviceUser={serviceUser} 
        serviceContent={serviceContent} 
        height={HEADER_MAX_HEIGHT} 
        headerTranslateY={headerTranslateY} 
        imageTranslateY={imageTranslateY}
        actionsOpacity={actionsOpacity}
        />

      <Footer />
    
    </ScrollView>

    <TopBar style={headerOpacity}>
      <Header.Title title='' />
    </TopBar>

    <Header.Buttoms leftAction='menu' right1Action='search_home' />

    <ContentInfo theme={theme}/>
  </Container>
)

View.propTypes = {
  actionsOpacity: PropTypes.object,
  headerOpacity: PropTypes.object,
  HEADER_MAX_HEIGHT: PropTypes.number,
  nativeEvent: PropTypes.object,
  headerTranslateY: PropTypes.object,
  titleTranslateY: PropTypes.object,
  imageTranslateY: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onScroll: PropTypes.func.isRequired,
}

export default View