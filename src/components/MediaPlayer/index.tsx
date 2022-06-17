import React, { useRef, useEffect, useState, useCallback } from 'react';
import Video from 'react-native-video'
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components/native'

import Icon from '~/components/Icon'

import {
  Platform,
  View, //nuevo
  Text,
  Image,
  ImageBackground, //nuevo
  Dimensions,
  Animated, 
  ActivityIndicator, 
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";

import style, { 
  Top, Back, Error, Bottom, Loading, Control, ViewTop, 
  TextTime, ViewTime, IconPlay, IconError, TextError,
  TextTitle, Thumbnail, IconDrawer,ViewAction,
  ViewSlider, CenterLeft, CenterRight, GradientTop,
  PlayerSlider, ControlsView, CenterCenter, GradientBottom,
  Image2,ImageBackground2,
} from './styles';

function MediaPlayer({
  theme,
  uuid,
  error,
  //time, 
  loading, 
  title, 
  currentPosition, 
  duration, 
  paused, 
  onBack, 
  onPause, 
  onSlidingStart, 
  onSlidingComplete,
  //onValueChange,
  onControls,
  isDrawerOpen
}){

  const [show, setShow] = useState(true)
  
  const [zone] = useState(zoneThumbnail())

  const [thumbs] = useState(prepareThumbnail(duration))
  
  const [s, setState] = useState({
    slider: false,
    position: 0,
  })

  var top = useRef(new Animated.Value(0)).current

  var bottom = useRef(new Animated.Value(0)).current

  var opacity = useRef(new Animated.Value(1)).current

  const onScreenTouche = useCallback(() => setShow(!show), [show])

  const onValueChange = useCallback( position =>
  {
    onThumbnail(position, zone, thumbs)
    //console.log('onValueChange',position)
    setState({...s, slider:true, position})
  },[s, zone, thumbs])

  const onComplete = useCallback( position =>
  {
    onSlidingComplete(position)
    
    setState({...s, slider:false})

  },[s])

  
  const onScreenTouch = useCallback(value => {
    
    setShow(!show)
    Animated.parallel([
      Animated.timing(opacity, { 
        toValue: show? 1 : 0,
        useNativeDriver: true
      }),
      Animated.timing(top, {
        toValue: show? 0 : -100 ,
        useNativeDriver: true
      }),
      Animated.timing(bottom, {
        toValue: show? 0 : 100 ,
        useNativeDriver: true
      }),
    ]).start();
  },[show])

  const time = s.slider? s.position : (currentPosition || 0)

  useEffect(() =>
  {
    let uuid = '095d997a-52c6-480e-ae4c-75a9ea5ead31_TheKillingFields1984'
    let backgroundImage = `https://twimglevel3.cdnar.net/qb_od_push/${uuid}/previews/`
    //`https://twimglevel3.cdnar.net/qb_od_push/${uuid}/previews/`
    
    backgroundImage = `https://assets.cdnar.net/qubit/thumbnails/095d997a-52c6-480e-ae4c-75a9ea5ead31_TheKillingFields1984/001.jpg`

  },[uuid, duration]);
  var backgroundImage2 = `https://assets.cdnar.net/qubit/thumbnails/095d997a-52c6-480e-ae4c-75a9ea5ead31_TheKillingFields1984/001.jpg`
  /*
  useEffect(function(){

    const time = setTimeout(() => {
      onScreenTouch(false)
    }, 4000) 
    return () => clearTimeout(time)

  },[])
  */

  //console.log('cardLeft', zone.cardLeft)
  
  return (
    <ControlsView>
      
        {/*TOP*/}
        <Animated.View style={[
          style.AnimatedViewTop,
          { transform: [{ translateY: top}]}
          ]}>
          <Top>
            <GradientTop>
              <ViewTop>
                <Back onPress={onBack} color='white'/>
              </ViewTop>
              <ViewTop>
                  <TextTitle>{title}</TextTitle>
              </ViewTop>
              <ViewTop>
                <ViewAction onPress={
                  (loading || error)
                    ? null
                    : onControls
                }>
                <IconDrawer isOpen={(isDrawerOpen || loading || error)} />
              </ViewAction>
              </ViewTop>
            </GradientTop>
          </Top>
        </Animated.View>

        {/*CENTER*/}
        <TouchableWithoutFeedback onPress={onScreenTouch}>
          <Animated.View style={[
            style.AnimatedViewCenter,
            (loading || error)
              ? {}
              : {opacity}
            ]}>

            {(loading || error)
              ? null
              : <CenterLeft/>
            }
            <CenterCenter>
              {((loading && !error) || (loading && error))
                ? <Loading>
                    <ActivityIndicator size='large' color={theme.color.orange}/>
                  </Loading>
                : null
              }
              {(!loading && error)
                ? <Error>
                    <IconError/>
                    <TextError>
                      Video no Disponible
                    </TextError>
                  </Error>
                : null
              }
              {(loading || error)
                ? null
                : <Control onPress={onPause}>
                    <IconPlay paused={paused} />
                  </Control>
              }
            </CenterCenter>
            {(loading || error)
              ? null
              : <CenterRight/>
            }
          </Animated.View>
        </TouchableWithoutFeedback>

        {/*BOTTOM*/}

        <Animated.View style={[
          style.AnimatedViewBottom,
          { transform: [{ translateY: bottom}]}
          ]}>
          {(s.slider && uuid===`095d997a-52c6-480e-ae4c-75a9ea5ead31_TheKillingFields1984`)
            ? <Thumbnail.Container>
              <ImagePosition uuid={uuid} time={time} duration={duration}/>
              {zone.cardLeft.map((item, key) => <Thumbnail.Card key={key} {...zone} position={item} />)}
              <Thumbnail.Card {...zone} position={zone.center} current>
              
              </Thumbnail.Card>
              {zone.cardRight.map((item, key) => <Thumbnail.Card {...zone} key={key} position={item} />)}
            </Thumbnail.Container>
            : null
          }
          <Bottom>
              <GradientBottom>
                <ViewSlider>
                  <PlayerSlider
                    step={1}
                    value={currentPosition}
                    minimumValue={0}
                    maximumValue={duration}
                    onSlidingStart={onSlidingStart}
                    onSlidingComplete={onComplete}
                    onValueChange={onValueChange}
                    thumbTintColor={theme.color.orange}
                    maximumTrackTintColor={'#E0E0E339'}
                    minimumTrackTintColor={theme.color.orange}
                  />
                </ViewSlider>
                <ViewTime>
                  <TextTime>{secondsToString(error? 0 :time)}</TextTime>
                </ViewTime>
              </GradientBottom>
          </Bottom>
        </Animated.View>
        
     </ControlsView>
  )
}

var contimage = 0
function ImagePosition({uuid, time, duration})
{
  const [url] = useState(`https://assets.cdnar.net/qubit/thumbnails/${uuid}`)
  const [crtl, setCrtl] = useState([])


  useEffect(function(){

    const time_card = 2.377144
    const increment = time_card * 100

    var images_card = duration / time_card

    var cont = 0
    var data = []

    var ini = 0
    var fin = increment

    while(true){

      cont++

      let value
      if(cont>=100) value = `${cont}`
      else if(cont>=10) value = `0${cont}`
      else value = `00${cont}`

      fin = cont * (time_card * 100)
      data.push({
        ini, 
        fin,
        image:`${value}.jpg`
      })

      ini = fin 
      fin = fin + fin

      if((cont * 100) >= images_card) break
    }
    setCrtl(data)
  },[])
  /*
  useEffect(function(){

    let search = crtl.find(item => item.ini>time  && time<=item.fin)

    if(search && current!==search.image){
      //setCurrent(search.image)
      //setLeft()
    }

  },[current, crtl, time]);
  */
  return (
    <ScrollView style={{
      height: 68,
      width: 'auto',
      flexDirection: 'row'
    }}>
      {crtl.map((item, key) => {

        //if(item.ini>time  && time<=item.fin){

        //}
        return (
          <Image
            key={key}
            source={{uri: `${url}/${item.image}`}}
            resize='auto'
            style={{
              zIndex: -1,
              //position: "relative",
              width: 12000,
              height: 68,
              //width: 12000,
              //height: 68,
              left:-(Math.round(Math.round(time) * 2.377144))
            }}
            />
          )
      })}
    </ScrollView>
  )

  return (
    <Image
      source={{uri: `${url}/${current}`}}
      source={{uri: `${url}/001.jpg`}}
      resize='auto'
      style={{
        zIndex: -1,
        position: "relative",
        width: 12000,
        height: 68,
        //width: 12000,
        //height: 68,
        //left:-(Math.round(Math.round(time) * 120))
        left
      }}
      />
    )
}


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

function zoneThumbnail()
{
  let center, left, right, margin, cant, cardWith, width, cardMedia, widthMedia, cardLeft, cardRight
  cant = 1
  marging = 2
  cardWith = 120 
  cardWithMaring = cardWith + marging
  width = Dimensions.get('screen').width
  cardMedia = cardWith / 2
  widthMedia = width / 2
  center = widthMedia - cardMedia

  while(true){
    
    if((cant * cardWithMaring) >= width) break
    cant ++
  }

  cant = Math.round((cant / 2))
  cardLeft  = []
  cardRight = []

  /*

  for (var i = 1; i <= cant; i++)
  {
    if(i === 1){
      left = (widthMedia - cardMedia)
      right = (widthMedia + cardMedia)
    }
    else{

      left = (left - cardWith)
      right = (right + cardWith)
      cardLeft.push(left)
    }
    cardRight.push(right)
  }
  */

  for (var i = 1; i <= 10; i++)
  {
    if(i === 1){
      left = (widthMedia - cardMedia)
      right = (widthMedia + cardMedia)
    }
    else{

      left = (left - cardWith)
      right = (right + cardWith)
      cardLeft.push(left)
    }
    cardRight.push(right)
  }

  return {
    cant,
    cardWith,
    cardMedia,
    width,
    widthMedia,
    center,
    cardLeft,
    cardRight
  }
}

function prepareThumbnail(duration)
{
  var i, z;
  const frame = 200;
  var data = [];
  const parte = parseFloat(parseFloat(frame / 100).toFixed(1));
  var contad1 = 0;
  var contad2 = parte;
  var contador1 = 0;
  var contador2 = 0;

  const bgposition = [];
  const width = 200;
  const height = 100;
  var x = 0;
  var y = 0;
  for (i = 0; i < 100; i++) {
    if ([10, 20, 30, 40, 50, 60, 70, 80, 90].indexOf(i) !== -1) {
      y = (y + height);
      x = 0;
    }
    bgposition[i] = { n: (i + 1), x, y };
    x = (x + width);
  }
  for (i = 1; i < duration; i++) {
    if (i === (contador2 + 1)) {
      const cont3 = (contador1 + 1);
      var contador = '0' + ((cont3 < 10) ? ('0' + cont3) : cont3);
      data[contador1] = { n: 'images_' + contador + '.jpg', d: parseFloat(parseFloat(contador2 > 0 ? contador2 + 0.1 : 0).toFixed(1)), h: (contador2 + frame), p: [] };

      for (z = 0; z < 100; z++) {
        data[contador1].p[z] = { n: (z + 1), d: (parseFloat(parseFloat(contad1 !== 0 ? contad1 + 0.1 : contad1).toFixed(1))), h: contad2 };
        contad1 = parseFloat(parseFloat((contad1 + parte)).toFixed(1));
        contad2 = parseFloat(parseFloat(contad2 + parte).toFixed(1));
      }
      contador2 = (contador2 + frame);
      contador1++;
    }
  }
  return {
    duration,
    mintutes: duration / 60,
    thumbnail_reference: data,
    thumbnail_position: bgposition,
  }
}


function onThumbnail(position, zone, thumbs){


  //console.log(thumbs)
  /*
  if (!Array.isArray(state_player.thumbnail_reference)) break;
  const width_cover = state_player.thumbnail.offsetWidth;
  const media_cover = width_cover / 2;
  const width_bar = event.target.offsetWidth;
  const media_bar = width_bar / 2;
  const position = event.offsetX;

  var left = '0px';

  if (position < media_bar) {
    left = (position > media_cover) ? (position - media_cover) : '0';
  }
  else {
    left = ((position + media_cover) < width_bar) ? (position - media_cover) : (width_bar - width_cover);
  }
  state_player.thumbnail.style.left = left + 'px';

  const seg = parseFloat((state_player.duration * position) / width_bar).toFixed(3);


  const img = state_player.thumbnail_reference.find(item => item.d <= seg && seg <= item.h);

  if (img) {
    const xy = img.p.find(item => item.d <= seg && seg <= item.h);
    if (xy) {
      const pst = state_player.thumbnail_position.find(item => item.n === xy.n);
      if (pst) {
        state_player.thumbnail.style.backgroundImage = 'url(https://twimglevel3.cdnar.net/qb_od_push/' + state_player.uuid + '/previews/' + img.n + ')';
        state_player.thumbnail.style.backgroundPosition = '-' + pst.x + 'px -' + pst.y + 'px';
      }
    }
  }
  state_player.thumbnail_mintutes.textContent = toHHMMSS(seg);
  */
}


/*

MediaPlayer.propTypes = {
  title: PropTypes.string,
  currentPosition: PropTypes.number,
  duration: PropTypes.number,
  paused: PropTypes.bool,
  hidePlayButton: PropTypes.bool,
  onBack: PropTypes.func,
  onChangePosition: PropTypes.func,
  onPause: PropTypes.func,
};
*/


export default withTheme(MediaPlayer)