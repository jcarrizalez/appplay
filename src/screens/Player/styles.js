import styled from 'styled-components/native'
import VideoPlayer, {TextTrackType as Type} from 'react-native-video'
import {MediaPlayer} from '~/components'

export const TextTrackType = Type

export const Container = styled.View`
  background-color: ${p=>p.theme.color.playerBlack};
  height: 100%;
  width: 100%;
`

export const Video = styled(VideoPlayer).attrs(s =>({
  fullscreen: true,
  fullscreenAutorotate: false,
  playInBackground: false,
  repeat: false,
  fullscreenOrientation: 'portrait',
  hideShutterView: true,
  progressUpdateInterval: 250,
  posterResizeMode: 'stretch',
  useTextureView: true,
}))`
  background-color: ${p=>p.theme.color.playerBlack};
  flex: 1; 
  overflow: hidden;
  position: absolute; 
  top: 0; 
  right: 0;
  bottom: 0; 
  left: 0;
`

export const Controls = styled(MediaPlayer)`
`