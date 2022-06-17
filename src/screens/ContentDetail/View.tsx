import React from 'react'
import PropTypes from 'prop-types'
import {Header, Publicity} from '~/components'
import {Content, Buttom} from './styles'
import {contents, onUnique} from 'services'

const {
  Container, ScrollView, TitleGradient, TitleView, TitleText, 
  CountryText, CountryTouch, CountryItem, GenresContainer, 
  Info, DirectorsContainer, DirectorsTitle, DirectorsText, 
  GenresText, GenresTouch, GenresItem, ButtomsContainer,
  DirectorsTouch, DirectorsItem, CountryContainer, Anio, 
  TagContainer, TagTitle, TagGroup, RelatedContainer, 
  CastsContainer, CastsData, DescriptionContainer,
  Description1, Description2, DescriptionData,
  RelatedData, Footer, ImageContainer, TopBar,
  ImageTouch, Fanart, ImageTop, Background,
} = Content

const ViewContentDetail = ({Buttoms, Related, Banner, onTags, onContentSearch, onScroll, data, username, animations:{headerOpacity, actionsOpacity, nativeEvent, HEADER_MAX_HEIGHT, contentContainerStyle, headerTranslateY, titleTranslateY, imageTranslateY}}) => (
  <Container>
    <ScrollView 
      contentContainerStyle={contentContainerStyle}
      onScroll={onScroll(nativeEvent, {useNativeDriver: true})}
      >
      <Content.TitleGradient>
        <Content.TitleView style={actionsOpacity}>
          <Content.TitleText data={data} />
        </Content.TitleView>
       </Content.TitleGradient>

      <Info>
        <DirectorsContainer>
          <DirectorsTitle data={data} />
          {data.directors?.map((item, key) => (
            <React.Fragment key={key}>
              <DirectorsText id={key} />
              <DirectorsTouch onPress={ () => onContentSearch('directors',item)}>
                <DirectorsItem name={item.name} />
              </DirectorsTouch>
            </React.Fragment>
          ))}
        </DirectorsContainer>
    
        <CountryContainer>
          {data.countries?.map((item, key) => (
              <React.Fragment key={key}>
                <CountryText id={key} />
                <CountryTouch onPress={ () => onContentSearch('countries',item)}>
                  <CountryItem name={item.name} />
                </CountryTouch>
              </React.Fragment>
            ))}
          <Anio data={data} />
        </CountryContainer>        
        <GenresContainer>
          {data.genres?.map((item, key) => (
            <React.Fragment key={key}>
              <GenresText id={key} />
              <GenresTouch onPress={ () => onContentSearch('genres',item)}>
                <GenresItem name={item.name} />
              </GenresTouch>
            </React.Fragment>
          ))}
        </GenresContainer>
        
        <ButtomsContainer>
          <Buttoms data={data} username={username}/>
        </ButtomsContainer>
        
        <Publicity.Content/>
        
        <DescriptionContainer>
          <Description1 />
          <DescriptionData data={data} />
        </DescriptionContainer> 
        <DescriptionContainer>
          <Description2 data={data}/>
          <DescriptionData data={data} is2={true}/>
        </DescriptionContainer> 
        <CastsContainer>
          <CastsData data={data} onPress={ item => onContentSearch('stars',item)}/>   
        </CastsContainer>
        
        <TagContainer>
          <TagTitle data={data} />
          <TagGroup 
            data={data}
            onSelectedTagChange={onTags}
            />
        </TagContainer>
        <Related data={data} />
        <Footer />
      </Info>
      <Banner 
        data={data}
        imageTranslateY={imageTranslateY}
        headerTranslateY={headerTranslateY}
        height={HEADER_MAX_HEIGHT}
        />
  
    </ScrollView>
    <TopBar style={headerOpacity}>
      <Header.Title title={data.title??''} />
    </TopBar>
    <Header.Buttoms/>
  </Container>
)

const ViewRelated = ({data:{elements}, onContentInfo}) => elements
? (
  <RelatedContainer>
    <RelatedData
      data={{elements: contents.get(onUnique(elements))}}
      onPress={onContentInfo} 
      onLongPress={()=>null} 
      onScroll={()=>null} 
      />
  </RelatedContainer>
)   
: null

const ViewBanner = ({onPress, fanart, height, headerTranslateY, imageTranslateY}) => (
  <ImageContainer style={[{height}, headerTranslateY]}>
    <Background style={[{height}, imageTranslateY]}>
    <ImageTouch onPress={onPress}>
      <Fanart height={height} fanart={fanart} />
    </ImageTouch>
    <ImageTop />
    </Background>
  </ImageContainer>
)

const ViewButtoms = ({active, loading, check, description, castState, onWatchlater, onLogin, onPlay}) => description 
? <>
    {active
      ? <Buttom.MyList loading={loading} check={check} onPress={onWatchlater} />
      : <Buttom.Login onPress={onLogin} />
    }
    <Buttom.Ver onPress={onPlay} castState={castState}/>
  </>
: null

ViewContentDetail.propTypes = {
  //theme: PropTypes.object.isRequired,
}

ViewRelated.propTypes = {
  elements: PropTypes.array,
  onContentInfo: PropTypes.func.isRequired,
}

ViewBanner.propTypes = {
  fanart: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}


export default {
  Banner: ViewBanner,
  Related: ViewRelated,
  Buttoms: ViewButtoms,
  ContentDetail: ViewContentDetail
}