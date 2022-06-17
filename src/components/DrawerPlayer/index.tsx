import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types';
import {redux} from '~/services'
import {View, StatusBar, Text } from 'react-native'
import {withTheme} from 'styled-components/native'

import { 
  Info,
  Audio,
  Font,
  Subtitles,
  SectionA,
  SectionB,
  SafeAreaView,
  Gradient, 
  Background,
  Footer,
  Container,
 } from './styles'

/*
var tamanio = [
  {name:'qQ', number:12},
  {name:'qQ', number:16},
  {name:'qQ', number:20},
  {name:'qQ', number:24},
  {name:'qQ', number:28},
]
var aspect = [
  {name:'qQ', number:1},
  {name:'qQ', number:2},
  {name:'qQ', number:3},
  {name:'qQ', number:4},
  {name:'qQ', number:5},
]
*/
  
function DrawerPlayer()
{
  const [s, setState] = useState({})

  const onAudio = useCallback( ({unique, active, slug}) =>
  {
    if(unique) return 
    let value = active
      ? undefined
      : {type: 'language', value: slug}

    redux.push('event_player', {type:'selectedAudioTrack', value})

    setState({...s, selectedAudioTrack: value})
  },[s])

  const onSubtitle = useCallback( ({active, index}) => 
  {
    let value = active
      ? undefined
      : {type: 'index', value: index}

    redux.push('event_player', {type:'selectedTextTrack', value})

    setState({...s, selectedTextTrack: value})
  },[s])

  useEffect(function(){

    const unsubscribe = redux.subscribe( function(){
      if(redux.is('player_controls')) setState(redux.get('player_controls')) 
    });

    return () => unsubscribe()
  },[])

  var exist_subtitle = s.subtitles? true : false

  var unique = (s.audios?.length===1)

  return (
    <Container>
      <StatusBar hidden={true}  />
      <Gradient>
        <Background source={s.portrait} />
        <SafeAreaView>
        <SectionA>
          <Info.Title>{s.rating}  {s.title_original}</Info.Title>
          <Info.TimeIcon />
          <Info.TimeText>{s.duration}</Info.TimeText>
        </SectionA>
        <SectionB>
          <Audio.Container>
            <Audio.Icon/>
            <Audio.Text>PISTA DE AUDIO</Audio.Text>
            {s.audios?.map((item, key) =>{ 
              let active = unique
              if(s.selectedAudioTrack){
                 active = s.selectedAudioTrack.value === item.slug
              }
              return( 
              <Audio.TouchItem key={key} active={active} onPress={()=>onAudio({...item, unique, active})}>
                <Audio.Item active={active}>{item.name}</Audio.Item>
              </Audio.TouchItem>
            )})}
          </Audio.Container>
          <Subtitles.Container>
            <Subtitles.Icon exists={exist_subtitle}/>
            <Subtitles.Text>{exist_subtitle?'':'NO TIENE '}SUBTITULOS</Subtitles.Text>
            {s.subtitles?.map((item, key) => { 
              let active = false
              if(s.selectedTextTrack){
                active = s.selectedTextTrack.value === item.index
              }
              return( 
              <Subtitles.TouchItem key={key} active={active} onPress={()=>onSubtitle({...item, active})}>
                <Subtitles.Item active={active}>{item.title}</Subtitles.Item>
              </Subtitles.TouchItem>
            )})}
          </Subtitles.Container>
          {/*
          AUN NO EXITE CONFIGURACION EN ANDROID
          <Font.Container>
            <Font.Icon exists={exist_subtitle}/>
            <Font.Text>FUENTES</Font.Text>

            <Font.Row>
              <Font.Left>Tamaño: </Font.Left>
              <Font.Right>
                {tamanio.map((audio, key) =>( 
                  <Font.SizeTouchItem key={key} onPress={onSubtitle}>
                    <Font.SizeItem active={false} number={audio.number}>{audio.name}</Font.SizeItem>
                  </Font.SizeTouchItem>
                ))}
              </Font.Right>
            </Font.Row>
            <Font.Row>
              <Font.Left>Aspecto: </Font.Left>
              <Font.Right>
                {aspect.map((audio, key) =>( 
                  <Font.AspTouchItem key={key} onPress={onSubtitle}>
                    <Font.AspItem active={false} number={audio.number}>{audio.name}</Font.AspItem>
                  </Font.AspTouchItem>
                ))}
              </Font.Right>
            </Font.Row>
          </Font.Container>
          */}
        </SectionB>
        </SafeAreaView>
        <Footer />
      </Gradient>
    </Container>
  )
}

export default withTheme(DrawerPlayer)