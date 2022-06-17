import React from 'react'
import {View, Text} from 'react-native'
import Icon from '~/components/Icon'
import {Sheet, Devices, Info, Crtl} from './styles'
import {CastButton} from 'react-native-google-cast'

function secondsToString(seconds) {

  var hour = Math.floor(seconds / 3600);
  hour = Math.trunc(hour)
  hour = (hour < 10)? '0' + hour : hour;
  var minute = Math.floor((seconds / 60) % 60);
  minute = Math.trunc(minute)
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = Math.trunc(second)
  second = (second < 10)? '0' + second : second;
  return hour + ':' + minute + ':' + second;
}

const ViewContent = ({data, device, duration, pause, onStop, onPlay, onClient, castState, position, onSlidingStart, onValueChange, onSlidingComplete, onSessionManager}) => (

  <Crtl.Container>
    <Crtl.ImageContainer>
      <Crtl.Image data={data}/>
    </Crtl.ImageContainer>
    
    <Crtl.Title data={data}/>
    <Crtl.Slider>
      <Crtl.VolumeView>
        <Crtl.VolumeSlider
          step={1}
          value={0}
          vertical={true}
          minimumValue={0}
          maximumValue={10}
          //onSlidingStart={value => console.log(value)}
          //onSlidingComplete={value => console.log(value)}
          onValueChange={value => onClient(`volume`, (value / 10))}
          //onValueChange={value => console.log(value)}
        />
        <Crtl.VolumeText />
      </Crtl.VolumeView>
      <Crtl.Tracks>
        <Crtl.TrackRow>
          <Crtl.TrackSubtitles />
          <Info.Test onPress={()=> onClient('subtitle', [1])}>Español</Info.Test>
        </Crtl.TrackRow>
        <Crtl.TrackRow>
          <Crtl.TrackAudios />
          <Info.Test onPress={()=> onClient('subtitle', [2])}> Ingles</Info.Test>
          <Info.Test onPress={()=> onClient('subtitle', [3])}>Español</Info.Test>
        </Crtl.TrackRow>
      </Crtl.Tracks>
      <Crtl.TimeContainer>
        <Crtl.TimeLeft>{secondsToString(position)}</Crtl.TimeLeft>
        <Crtl.TimeRight>{secondsToString(duration - position)}</Crtl.TimeRight>
      </Crtl.TimeContainer>

      <Crtl.ViewSlider>
        <Crtl.PlayerSlider
          step={1}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          onValueChange={onValueChange}
        />
      </Crtl.ViewSlider>
      <Crtl.Actions>
        <Crtl.ActionTouch onPress={()=>onClient(`set-position`, (position - 30))}>
          <Crtl.Replay30 />
        </Crtl.ActionTouch>
        <Crtl.ActionTouch onPress={onPlay} play>
          <Crtl.Play pause={pause}/>
        </Crtl.ActionTouch>
        <Crtl.ActionTouch onPress={onStop}>
          <Crtl.Stop />
        </Crtl.ActionTouch>
      </Crtl.Actions>
    </Crtl.Slider>
    <Crtl.CastContainer onPress={()=> onSessionManager(`disconect`, {})}>
      <Crtl.CastIcon/>
      <Crtl.CastName device={device}/>
    </Crtl.CastContainer>

  </Crtl.Container>
)

const ViewContent222 = ({data, device, onClient, castState, position, onSlidingStart, onValueChange, onSlidingComplete, onSessionManager}) => (
  <Info.Container>
    <Info.HeaderLine/>
    <Info.HeaderLeft>
      <Info.HeaderImage data={data}/>
      {true
        ? null
        : <Info.HeaderLoading/>
      }
    </Info.HeaderLeft>

    <Info.Title data={data} />
    <Info.Device device={device}/>
    <Info.TestView>

    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Info.Test>Sub: </Info.Test>
      <Info.Test onPress={()=> onClient('subtitle', [1])}>Español</Info.Test>
    </View>

    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Info.Test>Audio: </Info.Test>
      <Info.Test onPress={()=> onClient('subtitle', [2])}> Ingles</Info.Test>
      <Info.Test onPress={()=> onClient('subtitle', [3])}>Español</Info.Test>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Info.Test onPress={()=> onClient('subtitle', [])}>Clear</Info.Test>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Info.Test>Mute: </Info.Test>
      <Info.Test onPress={()=> onClient('muted', true)}> true </Info.Test>
      <Info.Test onPress={()=> onClient('muted', false)}> false </Info.Test>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Info.Test onPress={()=> onClient('pause')}>pause</Info.Test>
      <Info.Test onPress={()=> onClient('play')}>play</Info.Test>
      <Info.Test onPress={()=> onClient('stop')}>stop</Info.Test>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Info.Test>Volume: </Info.Test>
      <Info.Test onPress={()=> onClient('volume', 0.1)}> 1 </Info.Test>
      <Info.Test onPress={()=> onClient('volume', 0.5)}> 2 </Info.Test>
      <Info.Test onPress={()=> onClient('volume', 1)}> 3 </Info.Test>
    </View>
    </Info.TestView>
    <Info.Disconect onPress={()=> onSessionManager(`disconect`, {})}>
      <Info.Buttom active={true}>
        <Info.ButtomText state={castState}/>
      </Info.Buttom>
    </Info.Disconect>
      <Info.Slider>
      <Info.ViewSlider>
        <Info.PlayerSlider
          step={1}
          value={position}
          minimumValue={0}
          maximumValue={data.loadMedia.mediaInfo.streamDuration}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          onValueChange={onValueChange}
        />
      </Info.ViewSlider>
      <Info.ViewTime>
        <Info.TextTime>{secondsToString(position)}</Info.TextTime>
      </Info.ViewTime>
      </Info.Slider>


    <Info.AnioRating data={data} />
    <Info.Duration data={data} />
    <Info.Description data={data} />
    {/*
    <Info.Imdb>
      <Icon name="star" color='gray' size={15}/>
      <Icon name="star" color='gray' size={15}/>
      <Icon name="star" color='gray' size={15}/>
      <Icon name="star-half" color='gray' size={15}/>
      <Icon name="star-border" color='gray' size={15}/>
    </Info.Imdb>
  */}
  </Info.Container>
)

const ViewContent3 = ({data, onImageLoad, onClose, onContentDetail}) => (
  <Info.Container>
    <Info.HeaderLine/>
    <Info.HeaderLeft>
      <Info.HeaderImage data={data} onLoadEnd={onImageLoad}/>
      {data?.loadimg
        ? null
        : <Info.HeaderLoading/>
      }
    </Info.HeaderLeft>

    <Info.Title data={data} />
    <Info.AnioRating data={data} />
    <Info.Duration data={data} />
    <Info.Description data={data} onPress={onContentDetail} />
    <Info.Imdb>
      <Icon name="star" color='gray' size={15}/>
      <Icon name="star" color='gray' size={15}/>
      <Icon name="star" color='gray' size={15}/>
      <Icon name="star-half" color='gray' size={15}/>
      <Icon name="star-border" color='gray' size={15}/>
    </Info.Imdb>
  </Info.Container>
)


const ViewContent2 = ({onClient}) => (
  <View>
    <Text onPress={()=> onClient('subtitle', [1])}>Sub. Español</Text>
    <Text onPress={()=> onClient('subtitle-color')}>Sub. Color</Text>
    <Text onPress={()=> onClient('subtitle', [2])}>Audio Ingles</Text>
    <Text onPress={()=> onClient('subtitle', [3])}>Audio Español</Text>
    <Text onPress={()=> onClient('subtitle', [])}>Clear</Text>
    <Text onPress={()=> onClient('muted', true)}>Mute true</Text>
    <Text onPress={()=> onClient('muted', false)}>Mute false</Text>
    <Text onPress={()=> onClient('play')}>play</Text>
    <Text onPress={()=> onClient('pause')}>pause</Text>
    <Text onPress={()=> onClient('stop')}>stop</Text>
    <Text onPress={()=> onClient('set-position', 1500)}>set-position</Text>
    <Text onPress={()=> onClient('get-position')}>set-position</Text>
    <Text onPress={()=> onClient('volume', 0.1)}>Volume 1</Text>
    <Text onPress={()=> onClient('volume', 0.5)}>Volume 2</Text>
    <Text onPress={()=> onClient('volume', 1)}>Volume 3</Text>
  </View>
)
const ViewDevices = ({castState, onSessionManager, devices, height_devices, cant_devices, theme}) => (
  <Devices.Container height={height_devices}>
    <Devices.Title cant={cant_devices}/>
    <Devices.ScrollView>
    {devices.map((item, key) => (
      <Devices.Item key={key}>
        <Devices.Touch onPress={()=>onSessionManager(`conect`,item)}>
          {item.active
            ? <CastButton style={{width: 24, height: 24, tintColor: theme.color.white, marginTop: 5, zIndex: -1}} />
            : <Icon name='cast' size={24} style={{marginTop: 5}}/>
          }
          <Devices.Name device={item} />
          <Devices.Model device={item} />
        </Devices.Touch>
         <Devices.Touch onPress={()=> onSessionManager(`disconect`, {})}>
          <Devices.Buttom active={item.active}>
            <Devices.ButtomText state={castState}/>
          </Devices.Buttom>
        </Devices.Touch>
      </Devices.Item>
    ))}
    </Devices.ScrollView>
  </Devices.Container>
)

export default {
  Devices: ViewDevices,
  Content: ViewContent,
}