import React, { Component, useRef } from 'react';
import Video from 'react-native-video';
import { StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, ImageBackground, PanResponder, Animated, SafeAreaView, Easing, Image, View, Text,BackHandler
 } from 'react-native'

//import _ from 'lodash';

//import  { ProgressBar }  from '@react-native-community/progress-bar-android';

//import Orientation from 'react-native-orientation-locker';

//import GoogleCast, { CastButton } from 'react-native-google-cast';

//import { EventRegister } from 'react-native-event-listeners'

//import SystemSetting from 'react-native-system-setting';
//import KeyEvent from 'react-native-keyevent';

const ProgressBar = () => <View />
const CastButton = () => <View />
var cast_connected = false;
var cast_mode_tv = false;
var cast_paused = false;

const { width, height } = Dimensions.get('window');
var global = {
    width,
    height,
    orientation:(width>height)?'landscape': 'portrait',
    current_time:0,
    show_controls: false,
    last_screen_press:0,
    full_screen: false,
    icon_pause:true,
    loading:false,
    seeking: false,
    error: false,
    seeker:{
        offset: 0,
        fill_width: 0,
        position: 0,
    },
    bottom:{
        screen:true,
        volume:true,
        back:true,
        cast:true,
        title:true,
        castPicker:true,
        timer:true,
        progress:true,
    },
    cast:{
        paused:false,
        duration:0,
        connected:false,
        devices:false,
        sending:false,
        running:false,
    },
    player:{
        paused:false,
        muted:false,
        rate:1,
        duration:0,
        controlTimeoutDelay: 55000,
        volumePanResponder: PanResponder,
        controlTimeout: null,
        volumeWidth: 150,
        iconOffset: 0,
        seekerWidth: 0,
        ref: Video,
        live:true,
    }
}

var landscape = (width>height);

var animations = {
    opacity: new Animated.Value(1),
    margin: new Animated.Value(0),
    loader: {
        rotate: new Animated.Value(0),
        MAX_VALUE: 360,
    }
};

//const emiter = (key, data) => EventRegister.emit(key, data);
const emiter = (key, data) => null

class Chromecast extends Component {
    googleCastDevice = () => null
    /*
    googleCastDevice = () => GoogleCast.getCastState().then( state => { 
        setTimeout(() => this.googleCastDevice(), 5000);
        global.cast.devices = (state!=='NoDevicesAvailable');
        if(state==='Connected' && !global.cast.connected){
            //EventRegister.emit('safe_area', 10);
        }
        this.setState({});
    });
    */
    setGlobal = (action, type) => {
        global.cast.running = true;

            if(action===10){
                global.cast.connected = true;
                global.cast.running = false;
            }
            else if(action===11){
                global.cast.connected = false;
                global.cast.sending = false;
            }
            else if(action===1){
                global.cast.sending = false;
                global.cast.running = false;
                global.player.paused = false;
                global.icon_pause = true;
            }
            else if(action===2){
                global.cast.connected = true;
                global.cast.sending = true;
                global.cast.paused = false;
                global.player.paused = true;
                global.icon_pause = true;
                global.cast.running = false;
                global.loading = false;
            }
            else if(action===3){
                global.cast.connected = true;
                global.cast.sending = true;
                global.cast.paused = true;
                global.icon_pause = false;
                global.cast.running = false;
                global.loading = false;
            }
            else if(action===4){
                global.cast.connected = true;
                global.cast.sending = true;
                global.player.paused = true;
                global.icon_pause = true;
                global.cast.running = false;
                global.loading = true;
            }
            emiter('Controls');
            console.log('action',action)
            // playerState: 1 stop
            // playerState: 3 pasusado
            // playerState: 5 desconectado 
            // playerState: 2 transmitiendo 
            // playerState: 4 enviando 
            this.setState({});
    }

    componentDidMount = ()  => {

        //GoogleCast.initChannel('urn:x-cast:your.own.namespace');
        //GoogleCast.initChannel('B472DF20');
        this.googleCastDevice();

        /*
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => this.setGlobal(10) );
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, error => this.setGlobal(11) );
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTING, () => this.setGlobal(12) );
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDING, () => this.setGlobal( 13) );
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PROGRESS_UPDATED,({ mediaProgress }) => {
            EventRegister.emit('progress_time', mediaProgress.progress) 
        });
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_STATUS_UPDATED,({ mediaStatus }) => this.setGlobal(mediaStatus.playerState) );
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_START_FAILED, error => { console.error(error) });
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_SUSPENDED, () => { console.log('SESSION_SUSPENDED') });
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMING, () => { console.log('SESSION_RESUMING') });
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMED, () => { console.log('SESSION_RESUMED') });
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED,({ mediaStatus }) => {
            console.log('MEDIA_PLAYBACK_STARTED', mediaStatus)
        })
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_ENDED,({ mediaStatus }) => {
            console.log('MEDIA_PLAYBACK_ENDED', mediaStatus)
        })
        GoogleCast.EventEmitter.addListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED,({ channel, message }) => {console.log('CHANNEL_MESSAGE_RECEIVED '+channel, message);});
        GoogleCast.getCastDevice().then((device) => {
            console.log(device.name)
            // : { id, model, name, version }
        });
        */
    };


    componentWillUnmount = ()  => {
        /*
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_STARTING, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_STARTED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_START_FAILED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_SUSPENDED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_RESUMING, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_RESUMED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_ENDING, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_ENDED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED, () => null)
        */
    };

    render = () => null
    //<CastButton style={cssBottom('cast').img} />
    render2 = () => 
        <Touch onPress={() => null /*GoogleCast.showCastPicker()*/}>
            <View style={cssBottom('cast').base}>
            <CastButton style={cssBottom('cast').img} />
            </View>
        </Touch>;
}


const setOrientation = () => {

    if(global.orientation==='portrait'){
        landscape = true;
        global.orientation = 'landscape';
        //Orientation.lockToLandscapeLeft();
    }
    else{
        landscape = false;
        global.orientation = 'portrait';
       // Orientation.lockToPortrait();
    }
    emiter('Controls');
    emiter('Player');
    emiter('App');
}

export default class App extends Component {

    constructor( props ) {
        super( props );
        //Orientation.lockToPortrait();
    }
    componentDidMount = () => {
        this.props.navigation.setOptions({
          headerShown: false,
        })
        this.event = null
        //this.event = EventRegister.addEventListener('App', () => this.setState({}) );
        //Orientation.addDeviceOrientationListener(this.onOrientation.bind(this));
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    };

    componentWillUnmount = () => {
        //EventRegister.removeEventListener(this.event);
        //Orientation.removeDeviceOrientationListener(this.onOrientation);
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    };

    goBack = (is_props=false) => {
        //Orientation.lockToPortrait(); 
        //Orientation.unlockAllOrientations();
        if(is_props){
            this.props.navigation?.goBack();
        }
        return false;
    };

    onOrientation = (value) => {
        /*
        if(!landscape && value.indexOf('LANDSCAPE')!== -1){
            landscape = true;
            global.orientation = 'landscape';
            this.setState({});
            console.log(1, value)
        }
        else if(landscape && value.indexOf('LANDSCAPE')=== -1){
            landscape= false;
            global.orientation = 'portrait';
            console.log(2, value)
        }
            this.setState({});
        */

        //if(landscape && value==='LANDSCAPE-LEFT' && Orientation.isLocked()){
          //  Orientation.lockToLandscapeLeft();
        //}
        //else if(landscape && value==='LANDSCAPE-RIGHT' && Orientation.isLocked()){
         //   Orientation.lockToLandscapeRight();
        //}
        /*  
        */
        //console.log(orientation)
    }

    render = () =>
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'black'}}>
                <TouchableWithoutFeedback onPress={() => on_screen_touch() }>
                    <View style={{flex:1, backgroundColor: 'black'}} onStartShouldSetResponder={() => null}>
                        <Chromecast />
                        <Player />
                        <Controls />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={{flex:landscape? 0:2, backgroundColor:'black'}}>
            </View>
        </View>
}

function ProgressBarr(){
    var width = (landscape)? global.width-200 : global.width;
    
    if(1!==0 && global.player.live && !global.error && !global.loading && !global.player.paused){
    return <ProgressBar style={{ width:'100%', top:7,transform: [{ scaleY: 0.4 }] }} indeterminate={true} styleAttr="Horizontal" color="#ff9300" />;
        return <ProgressBar style={{ width:'100%', bottom:2,transform: [{ scaleY: 0.2 }] }} indeterminate={true} styleAttr="Horizontal" color="#ff9300" />;
    }
    else if(global.player.live && (global.error || global.loading || global.player.paused)){
        return <View style={{width:'100%', backgroundColor: '#ff9300',  opacity: 0.3, top:15, height: 16 }} />;
        return <View style={{width:'100%', backgroundColor: '#ff9300',  opacity: 0.3, height: 1.5,top:24.5 }} />;
    }
    else{
        var offsetx = 0;
        var init = false;
        const onOffsetX = e => { if(e) offsetx = e; return offsetx; };
        const onInit = e => { if(e) init = e; return init; };

        const pan = useRef(new Animated.ValueXY()).current;

        var miduration = 400;
        var micurrentT = 100;
        var percent = (width * (micurrentT / miduration));

        const calculatePositionX = () => {
            var media = (width/2);
            return (percent<media)? ((media-percent)*-1) : (percent-media);
        }
        
        pan.setOffset({x: onOffsetX(calculatePositionX()), y: 0});

        const panResponder = useRef(
            PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onStartShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                    pan.setOffset({x:(onInit())?pan.x._value: onOffsetX(), y: pan.y._value });
                    onInit(true);
                },
                onPanResponderMove: (evt, gestureState) => {
                    if(gestureState.dx>onOffsetX() && gestureState.dx<=(width-(onOffsetX()<0? (onOffsetX()*-1): onOffsetX() ) )){
                        console.log(pan.getLayout())
                        pan.setValue({x: gestureState.dx, y: null})
                    }
                },
                onPanResponderRelease: () => pan.flattenOffset()
            }),
        ).current;

        return (
            <View style={{width: width, height: 100, flexDirection: 'column', alignItems: "center", justifyContent: "center", backgroundColor:'transparent'}}>
                    <View style={{backgroundColor: '#ff9300', height: 2, top: 52, alignItems: "flex-start", width: '100%'}}>
                        <View style={{backgroundColor: '#FFF', height: 2, top: 0, width: 0 }}/>
                    </View>
                    <Animated.View style={{transform: pan.getTranslateTransform()}} {...panResponder.panHandlers}>
                        <View style={{ height: 100,width: 50, backgroundColor: "transparent", borderRadius: 5}}>
                            <View style={{borderColor:'#ff9300', borderWidth:0.3, borderRadius: 12, top: 43, left: 20, height: 12, width: 12, backgroundColor: '#FFF'}} />
                        </View>
                    </Animated.View>
            </View>
        )

        return (
            <View style={{width: width, height: 50, flexDirection: 'column', alignItems: "center", justifyContent: "center", backgroundColor:'transparent'}}>
                    <View style={{backgroundColor: '#ff9300', height: 2, top: 74.5, alignItems: "flex-start", width: '100%'}}>
                        <View style={{backgroundColor: '#FFF', height: 2, top: 0, width: 0 }}/>
                    </View>
                    <Animated.View style={{transform: pan.getTranslateTransform()}} {...panResponder.panHandlers}>
                        <View style={{ height: 100,width: 50, backgroundColor: "transparent", borderRadius: 5}}>
                            <View style={{borderColor:'#ff9300', borderWidth:0.3, borderRadius: 3, top: 70, left: 20, height: 6, width: 6, backgroundColor: '#FFF'}} />
                        </View>
                    </Animated.View>
            </View>
        )

        
    }
}


class Player extends Component{

    componentDidMount = () => {
        this.event = null
        //this.event = EventRegister.addEventListener('Player', () => this.setState({}) );
    }

    componentWillUnmount = () => {

        //EventRegister.removeEventListener(this.event);
    }

    onLoadStart = () => {
        global.loading = true;
        load_animation();
        emiter('Controls')
    };

    onLoad = ( data = {} ) => {
        global.loading = false;
        global.player.duration = (data.duration)? data.duration : 0;
        global.player.live = (!data.duration);
        emiter('Controls')
    };

    onProgress = (data={}) => {
        emiter('progress_time', data.currentTime);
        if (!global.seeking) emiter('progress_bar');
    };

    onEnd = () => {
        global.loading = false;
        emiter('Controls')
    };

    onError = ( err ) => {
        global.loading = false;
        global.error = true;
        emiter('Controls')
    };

    player1 = () => <Video
        id={1}
        ref={ videoPlayer => global.player.ref = videoPlayer }
        resizeMode={'cover'}
        volume={10}
        paused={global.player.paused}
        muted={global.player.muted}
        rate={global.player.rate}
        onLoadStart={ this.onLoadStart.bind(this) }
        onProgress={ this.onProgress.bind(this) }
        onEnd={ this.onEnd.bind(this) }
        onError={ this.onError.bind(this) }
        onLoad={ this.onLoad.bind(this) }
        //onFullScreen={(true) ? 'cover' : 'contain'}
        style={{ overflow: 'hidden', position: 'absolute',top: 0,right: 0,bottom: 0, left: 0}}
        //source={require('~/assets/videos/broadchurch.mp4')}
        //source={{ uri: 'https://www.latatv.com:444/live/5dcc76a163dbe/index.m3u8'}}
        source={{ uri: 'https://docs.evostream.com/sample_content/assets/sintel1m720p.mp4'}}
    />
    render = () => this.player1()
}


class Controls extends Component{

    componentDidMount = () => {
        this.event = null
        //this.event = EventRegister.addEventListener('Controls', () => this.setState({}) );
    }

    componentWillUnmount = () => {

        //EventRegister.removeEventListener(this.event);
    }

    render = () => 
        <View style={{flex:1}}>
            <RenderError />
            <RenderLoading/>
            <AnimatedView type="top">
                <Background top>
                    <View style={cssLayout('top').left}>
                        <BottomBack/>
                    </View>
                    <View style={cssLayout('top').center}>
                        <BottomTitle data="SEÑAL EN VIVO"/>
                    </View>
                    <View style={cssLayout('top').right}>
                        <BottomScreen/>
                    </View>
                </Background>
            </AnimatedView>
            <View style={cssLayout('center').base}>
                <AnimatedView type="center-left">
                    <View style={cssLayout('center').left.top}>
                    </View>
                    <View style={cssLayout('center').left.center}>
                    </View>
                    <View style={cssLayout('center').left.bottom}>
                    </View>
                </AnimatedView>
                <AnimatedView type="center-center">
                    <View style={cssLayout('center').center.left}>
                    </View>
                    <View style={cssLayout('center').center.center}>
                        <BottomPlayPause />
                    </View>
                    <View style={cssLayout('center').center.right}>
                    </View>

                </AnimatedView>
                <AnimatedView type="center-right">

                    <View style={cssLayout('center').right.top}>

                        {landscape? <Touch onPress={() => null/*GoogleCast.showCastPicker()*/}>
                            <CastButton style={{height: 24, width: 24, tintColor: '#fff'}} />
                        </Touch>
                        :null}
                        {landscape? <BottomSwith />:null}

                    </View>

                    <View style={cssLayout('center').right.center}>
                    </View>

                    <View style={cssLayout('center').right.bottom}>

                        {!landscape? <BottomSwith />:null}
                        {!landscape? <Touch onPress={() =>null/*GoogleCast.showCastPicker()*/}>
                            <CastButton style={{height: 24, width: 24, tintColor: '#fff'}} />
                        </Touch>:null}

                    </View>
                </AnimatedView>
            </View>
            <AnimatedView type="bottom">
                {(landscape && global.player.live)?
                    <Background bottom style={{width:'100%', flexDirection:'column', alignItems:'flex-end'}}>
                            <ProgressTime type="fin" />
                            <ProgressBarr />
                    </Background>
                :
                    <Background bottom>
                        <View style={cssLayout('bottom').left}>
                            {landscape? <ProgressTime type="fin" /> : null}
                        </View>
                        <View style={cssLayout('bottom').center}>
                           <ProgressBarr />
                        </View>
                        <View style={cssLayout('bottom').right}>
                            {landscape? <ProgressTime type="fin" /> : null}
                        </View>
                    </Background>
                }
            </AnimatedView>
        </View>
}

const AnimatedView = ({type, children}) => {

    if(type==='bottom' && !landscape){
        return <View style={{backgroundColor:'transparent', height:50, alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom:0}}>
            {children}
        </View>;
    }
    else if(type==='bottom' && landscape){
        type = {flex:1, height:10, alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: animations.margin}
    }
    else if(type==='top'){
        type = {width:'100%', backgroundColor:'transparent', height: landscape? 60 : 50, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', marginTop: animations.margin}
    }
    else if(type==='center-left'){
        type = {width:landscape? 200 : 100, justifyContent: 'flex-start', alignItems: 'stretch', marginLeft: animations.margin}
    }
    else if(type==='center-center'){
        type = {flex:1, alignItems: 'center',  justifyContent: 'center', flexDirection: 'row', marginTop: animations.margin}
    }
    else if(type==='center-right'){
        type = {width:landscape? 200 : 100, justifyContent: 'flex-start', alignItems: 'stretch', marginRight: animations.margin}
    }
    return <Animated.View style={{backgroundColor:'transparent', opacity: animations.opacity,...type}}>
        {children}
    </Animated.View>;
}

const Background = ({top, style={}, children}) => 
    <ImageBackground
        source={(top)? require('./img/top-vignette.png') : landscape? require('./img/bottom-vignette.png'): {} }
        style={{width:'100%', flexDirection:'row',...style}}
        imageStyle={{resizeMode: 'stretch'}}>
            {children}
    </ImageBackground>;
/*
top:{
            left:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft:0},
            center:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
            right:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight:0}
        },
*/
const controlAnimation = () => {
    const type = (global.show_controls)? 'show' : 'hide'; 
    Animated.parallel([
        Animated.timing(animations.opacity, { toValue: (type==='hide')? 0 : 1 } ),
        Animated.timing(animations.margin, { toValue: (type==='hide')? -100 : 0 } ),
    ]).start();
};


const BottomPlayPause = () => {
    return (!global.loading && !global.error)?
        <TouchableOpacity 
            activeOpacity={ 0.3 } 
            style={css.bottom.play_pause[global.orientation].touch}
            onPress={()=>{
                if(animations.opacity._value===0) {
                    on_screen_touch();
                }
                else{
                    if(global.cast.sending){
                        //GoogleCast.launchExpandedControls()
                        //console.log(GoogleCast)
                        console.log(global.cast.paused)

                        if(global.cast.paused){
                            //GoogleCast.play();
                            //global.icon_pause = false;
                            // Send message
                            //GoogleCast.sendMessage('urn:x-cast:testChannel', 'testMessage');
                            //GoogleCast.sendMessage(channel, message)

                        }
                        else{
                            //GoogleCast.pause();
                            //global.icon_pause = true;
                        }
                        //global.icon_pause = !global.icon_pause;
                    }
                    else{
                        global.player.paused = !global.player.paused;
                        global.icon_pause = !global.player.paused;
                    }
                }
                emiter('Player');
                emiter('Controls');
            }}
        >
            <View style={cssBottom('play_pause').base}>
            <Image style={cssBottom('play_pause').img} source={ (global.icon_pause)? cssBottom('play_pause').pause : cssBottom('play_pause').play } />
            </View>
        </TouchableOpacity>
    :null;
}

const BottomSwith = () => (global.bottom.castPicker && global.cast.connected)?
    <Touch onPress={()=> {

        if(global.cast.running) return null;

        if(global.cast.sending){
            //GoogleCast.stop();
        }
        else{
            /*
            GoogleCast.castMedia({
              mediaUrl:
                'https://www.latatv.com:444/live/5dcc76a163dbe/index.m3u8',
              imageUrl:
                'https://yt3.ggpht.com/a/AATXAJxA4RetMC6IppvMZxENptIEd4WiuDLmlTwKvg=s900-c-k-c0xffffffff-no-rj-mo',
              title: 'VPI Noticias',
              subtitle:
                'Canal de noticias, prueba en APP de juan',
              streamDuration: 596, // seconds
              contentType: 'video/mp4', // Optional, default is "video/mp4"
              playPosition: 10, // seconds
              customData: {
                customKey: 'B472DF20',
              },
            });
            */
        }
        emiter('Player');
        emiter('Controls');
    }}> 
        {(global.cast.running)?
            <ProgressBar color="#ff9300" />
        :
        <Image style={cssBottom('swith').img} source={ (global.cast.sending)? cssBottom('swith').celular : cssBottom('swith').tv } />
        }
    </Touch>
:null;



class SafeArea extends Component {

    state = {};
    googleCastDevice = () => null
    /*
    googleCastDevice = () => GoogleCast.getCastState().then( state => { 
        setTimeout(() => this.googleCastDevice(), 5000);
        global.cast.devices = (state!=='NoDevicesAvailable');
        if(state==='Connected' && !global.cast.connected){
            //GoogleCast.endSession();
            //GoogleCast.showCastPicker();
            //EventRegister.emit('safe_area', 10);
        }
        this.setState({});
    });
    */
    componentDidMount = ()  => {

        this.googleCastDevice();
        /*
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => EventRegister.emit('safe_area', 10) );

        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, error => EventRegister.emit('safe_area', 11) );

        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTING, () => EventRegister.emit('safe_area', 12) );

        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDING, () => EventRegister.emit('safe_area', 13) );

        // Playing progress of the media has changed. The `mediaProgress` object contains the duration and new progress.
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PROGRESS_UPDATED,({ mediaProgress }) => {
            EventRegister.emit('progress_time', mediaProgress.progress) 
        });

        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_START_FAILED, error => { console.error(error) });

        // Connection suspended (your application went to background or disconnected)
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_SUSPENDED, () => { console.log('SESSION_SUSPENDED') });

        // Attempting to reconnect
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMING, () => { console.log('SESSION_RESUMING') });

        // Reconnected
        GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_RESUMED, () => { console.log('SESSION_RESUMED') });


        // Disconnected (error provides explanation if ended forcefully)
        
        // Status of the media has changed. The `mediaStatus` object contains the new status.
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_STATUS_UPDATED,({ mediaStatus }) => {
            EventRegister.emit('safe_area', mediaStatus.playerState);
        })

        // Media started playing
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED,({ mediaStatus }) => {
            console.log('MEDIA_PLAYBACK_STARTED', mediaStatus)
        })

        // Media finished playing
        GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_ENDED,({ mediaStatus }) => {
            console.log('MEDIA_PLAYBACK_ENDED', mediaStatus)
        })

        // Message received
        GoogleCast.EventEmitter.addListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED,({ channel, message }) => {console.log('CHANNEL_MESSAGE_RECEIVED '+channel, message);});
        
        
        GoogleCast.getCastDevice().then((device) => {
            console.log(device.name)
            // : { id, model, name, version }
        });
        */
    };


    

    componentWillUnmount = ()  => {
        /*
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_STARTING, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_STARTED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_START_FAILED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_SUSPENDED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_RESUMING, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_RESUMED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_ENDING, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.SESSION_ENDED, () => null)
        GoogleCast.EventEmitter.removeListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED, () => null)
        */
    };

    render = () => {
        return(
            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch',marginLeft: 12, marginRight: 12, marginBottom: 0}}>
                {this.props.children}
            </SafeAreaView>
        );
    }
}


const BottomVolume = ({fill, track, position }) => (global.bottom.volume)?
    <View style={{alignItems: 'center', flexDirection: 'row', marginLeft: 20, marginRight: 50, width: 150}}>
        <View style={{backgroundColor: '#ff9300', height:1, width:fill }}/>
        <View style={{backgroundColor: '#333', height:1, width:track }}/>
        <View style={{position: 'absolute', left: position }} { ...global.player.volumePanResponder.panHandlers }>
            <Touch>
                <Image source={ require( './img/volume.png' ) } />
            </Touch>
        </View>
    </View>
:null;




const BottomTimer = ({value, onPress}) => (global.bottom.timer)?
    <Touch onPress={() => onPress() } border={false}>
        <Text style={{color: '#FFF', fontSize: 11, textAlign: 'center'}}>
            {value}
        </Text>
    </Touch>
:null;


const Touch = ({children, onPress }) =>
    <TouchableHighlight 
        activeOpacity={ 0.3 } 
        style={{ borderWidth: 0, borderColor: '#ff9300', margin:2, borderRadius: 25,width: 50, height: 50, alignItems:'center', justifyContent: "center" }}
        onPress={()=>(onPress)? onPress() : null}
    >
        <View style={{backgroundColor:'transparent', borderRadius: 25,width: 50, height: 50, alignItems:'center', justifyContent: "center" }}>
            {children}
        </View>
    </TouchableHighlight>;






class ProgressTime extends Component {

    state = {time:null, remaining:false};

    data = '00:00:00';
    
    onPress = () => {
        if(this.props.type==='fin' && !global.player.live){
            this.setState({remaining:!this.state.remaining});
        }
    }

    secondsToString(seconds) {
      var hour = Math.floor(seconds / 3600);
      hour = (hour < 10)? '0' + hour : hour;
      var minute = Math.floor((seconds / 60) % 60);
      minute = (minute < 10)? ('0' + minute) : minute;
      var second = seconds % 60;
      second = (second < 10)? ('0' + second) : second;
      return hour + ':' + minute + ':' + second;
    }

    calculate = (time=0) => {

        let { current_time, player, cast } = global;
        time = parseInt(time);
        if(this.state.time!==time){

            if(this.props.type==='fin' && player.live){
                this.data = this.secondsToString(time);
            }
            else if(this.props.type==='fin' && !player.live){

                let fin = (cast.sending)? cast.duration : player.duration;
                if(this.state.remaining){
                    fin = fin-time;
                }

                this.data = this.secondsToString( parseInt(fin) );
            }
            else if(this.props.type==='ini' && player.live){
                this.data = (time % 2 === 0)? ' .' : '';
            }
            else if(this.props.type==='ini' && !player.live){
                this.data = this.secondsToString(time);
            }
            this.setState({time});
        }
        global.current_time = time;
        //global.cast.sending = true;
    }; 

    //componentDidMount = () =>this.progress_time = EventRegister.addEventListener('progress_time', (time) => this.calculate(time) );

    //componentWillUnmount = () => EventRegister.removeEventListener(this.progress_time);

    render = () => 
        <Text 
            onPress={()=> this.onPress()}
            style={{ minWidth:60,color:"#fff", textShadowColor:"black", textShadowOffset:{width: 0.5, height: 0.5}, textShadowRadius:1 }}>
            {this.data}
        </Text>;

    render2 = () => 
    <TouchableHighlight 
        activeOpacity={ 0.3 } 
        style={{ borderWidth: 0, borderColor: '#ff9300', margin:2, borderRadius: 5, width: 100, height: 40, alignItems:'center', justifyContent: "center" }}
        onPress={()=> this.onPress()}
    >   
        <View style={{backgroundColor:'green', borderRadius: 5,width: 100, height: 40, alignItems:'center', justifyContent: "center" }}>
        <Text 
            onPress={()=> this.onPress()}
            style={{ minWidth:60,color:"#fff", textShadowColor:"black", textShadowOffset:{width: 0.5, height: 0.5}, textShadowRadius:1 }}>
                {this.data}
        </Text>
        </View>
    </TouchableHighlight>;
}


const load_animation = () => {

    if ( global.loading ) {
        const { rotate } = animations.loader;
        Animated.sequence([
            Animated.timing(rotate, {
                    toValue: animations.loader.MAX_VALUE,
                    duration: 1500,
                    easing: Easing.linear,
                }
            ),
            Animated.timing(rotate, {
                    toValue: 0,
                    duration: 0,
                    easing: Easing.linear,
                }
            ),
        ]).start( load_animation );
    }
};

const on_screen_touch = () => {
    const time = new Date().getTime();
    if ( (time - global.last_screen_press) < 300 ) {
        global.full_screen = !global.full_screen;
    }
    controlAnimation();
    global.show_controls = !global.show_controls;
    global.last_screen_press = time;
};



/*################################ RENDER ################################*/
const RenderError = () => (global.error)?
    <View style={cssRender('error').base}>
        <Image source={ cssRender('error').source }/>
        <Text style={cssRender('error').text}>
            Video no Disponible
        </Text>
    </View>
:null;

const RenderLoading = () => (global.loading)? 
    <View style={cssRender('loading').base}>
    <ProgressBar color={cssRender('loading').color} />
    </View>
:null;

/*################################ BOTONES ################################*/
const BottomBack = ({onPress}) => (global.bottom.back)?
   <Touch onPress={()=> null}>
        <Image style={cssBottom('back').img} source={cssBottom('back').source}/>
    </Touch>
:null;

const BottomTitle = ({data}) => (global.bottom.title && data)?
    <Text style={cssBottom('title')} numberOfLines={ 1 }>
        { (data.length>50)? data.slice(0, 50)+'...' : data || '' }
    </Text>
:null;

const BottomCastPicker = () => (global.bottom.castPicker/* && global.cast.devices*/)?
    <Touch onPress={() => null /*GoogleCast.showCastPicker()*/}>
        <CastButton style={cssBottom('cast')} />
    </Touch>
:null;

const BottomScreen = () => (global.bottom.screen)?
    <Touch onPress={()=> setOrientation()}>
        <Image style={cssBottom('screen').img} source={(landscape)? cssBottom('screen').exit : cssBottom('screen').full } />
    </Touch>
:null;



/*################################ STYLES ################################*/
const cssLayout = (key) => css.layout[key][global.orientation];
const cssBottom = (key) => css.bottom[key][global.orientation];
const cssRender = (key) => css.render[key][global.orientation];
const css_portrait = {
    render:{
        error:{
            base:{backgroundColor: 'rgba( 0, 0, 0, 0.5 )', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,justifyContent: 'center',alignItems: 'center',},
            source:require( './img/error-icon.png' ),
            text:{backgroundColor: 'transparent', color: '#f27474'}
        },
        loading:{
            base:{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,justifyContent: 'center',alignItems: 'center'},
            color: '#ff9300'
        }
    },
    bottom:{
        play_pause:{
            touch:{ borderWidth:0, borderColor: '#ff9300', alignItems:'center', justifyContent: "center", marginLeft:1, marginRight:1, borderRadius: 50,width: 100, height: 100 },
            base:{backgroundColor:'transparent', alignItems:'center', justifyContent: "center", borderRadius: 50,width: 100, height: 100 },
            img:{width:30, height:30},
            pause: require( './img/pause_5x.png' ),
            play: require( './img/play_5x.png' )
        },
        title:{
            color: '#FFF', textShadowColor:"black", textShadowOffset:{width: 0.5, height: 0.5}, textShadowRadius:1, textAlign: 'center', textAlign: 'center',fontSize: 8
        },
        back:{
            img:{width:30, height:30},
            source:require( './img/iratras.png')
        },
        cast:{
            base:{width: 30, height: 30, top:15},
            img:{tintColor:'#fff'}
        },
        screen:{
            img:{width:30, height:30},
            full:require( './img/full_screen.png'),
            exit:require( './img/exit_full_screen.png')
        },
        swith:{
            img:{width:30, height:30},
            celular:require( './img/celular.png'),
            tv:require( './img/tv.png')
        },
    },
    layout:{
        top:{
            left:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft:0},
            center:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
            right:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight:0}
        },
        center:{
            base:{flex:4, flexDirection: 'row',alignItems: 'stretch',justifyContent: 'center'},
            left:{
                top:{flex:1, backgroundColor:'transparent', alignItems: 'flex-start',justifyContent: 'flex-start', marginLeft:0},
                center:{flex:1, backgroundColor:'transparent', alignItems: 'flex-start',justifyContent: 'center', marginLeft:0},
                bottom:{flex:1, backgroundColor:'transparent', alignItems: 'flex-start',justifyContent: 'flex-end', marginLeft:0},
            },
            center:{
                left:{flex:1, backgroundColor:'transparent', alignItems: 'center',justifyContent: 'flex-start'},
                center:{flex:2, backgroundColor:'transparent', alignItems: 'center',justifyContent: 'center'},
                right:{flex:1, backgroundColor:'transparent', alignItems: 'center',justifyContent: 'flex-end'},
            },
            right:{
                top:{flex:1, backgroundColor:'transparent', alignItems: 'flex-end',justifyContent: 'flex-start', marginRight:0},
                center:{flex:1, backgroundColor:'transparent', alignItems: 'flex-end',justifyContent: 'center', marginRight:0},
                bottom:{flex:1, backgroundColor:'transparent', alignItems: 'flex-end',justifyContent: 'flex-end', marginRight:0},
            }
        },
        bottom:{
            left:{backgroundColor:'transparent', alignItems: 'flex-start',justifyContent: 'center', width:0, marginLeft:0},
            center:{flex:1, backgroundColor:'transparent', alignItems: 'center',justifyContent: 'center'},
            right:{backgroundColor:'transparent', alignItems: 'flex-end',justifyContent: 'center', width:0, marginRight:0}
        },
    }
};


const css = {
    render:{
        error:{
            landscape:{...css_portrait.render.error},
            portrait:css_portrait.render.error,
        },
        loading:{
            landscape:css_portrait.render.loading,
            portrait:css_portrait.render.loading,
        }
    },
    bottom:{
        play_pause:{
            landscape:{
                ...css_portrait.bottom.play_pause,
                touch:{...css_portrait.bottom.play_pause.touch, marginLeft:2, marginRight:2, borderRadius: 75,width: 150, height: 150},
                base:{...css_portrait.bottom.play_pause.base, borderRadius: 75,width: 150, height: 150},
                img:{...css_portrait.bottom.play_pause.img, width:50, height:50 }
            },
            portrait:css_portrait.bottom.play_pause
        },
        title:{
            landscape:{...css_portrait.bottom.title,fontSize: 12 },
            portrait: css_portrait.bottom.title,
        },
        back:{
            landscape:css_portrait.bottom.back,
            portrait:css_portrait.bottom.back,
        },
        cast:{
            landscape:{
                ...css_portrait.bottom.cast,
                base:{...css_portrait.bottom.cast.base,width: 40, height: 40, top:20},
                img:css_portrait.bottom.cast.img
            },
            portrait:css_portrait.bottom.cast,
        },
        screen:{
            landscape:{
                ...css_portrait.bottom.screen,
                img:{...css_portrait.bottom.screen.img, width:40, height:40},
            },
            portrait:css_portrait.bottom.screen,
        },
        swith:{
            landscape:{
                ...css_portrait.bottom.swith,
                img:{...css_portrait.bottom.swith.img, width:40, height:40},
            },
            portrait:css_portrait.bottom.swith,
        },
    },
    layout:{
        top:{
            landscape:{
                left:{...css_portrait.layout.top.left, marginLeft:10 },
                center:{...css_portrait.layout.top.center},
                right:{...css_portrait.layout.top.right, marginRight:10 }
            },
            portrait:css_portrait.layout.top,
        },
        center:{
            landscape:{
                base:{...css_portrait.layout.center.base},
                left:{
                    top:{...css_portrait.layout.center.left.top, marginLeft:10},
                    center:{...css_portrait.layout.center.left.center, marginLeft:10},
                    bottom:{...css_portrait.layout.center.left.bottom, marginLeft:10},
                },
                center:css_portrait.layout.center.center,
                right:{
                    top:{...css_portrait.layout.center.right.top, marginRight:10},
                    center:{...css_portrait.layout.center.right.center, marginRight:10},
                    bottom:{...css_portrait.layout.center.right.bottom, marginRight:10},
                }
            },
            portrait:css_portrait.layout.center,
        },
        bottom:{
            landscape:{
                left:{...css_portrait.layout.bottom.left, width:100, marginLeft:10},
                center:{...css_portrait.layout.bottom.center},
                right:{...css_portrait.layout.bottom.right, width:100, marginRight:10}
            },
            portrait:css_portrait.layout.bottom
        },
    }
}








          /*
        <Animated.Image source={ require( './img/loader-icon.png' ) } 
            style={{...styles.loader.icon,
                transform: [
                    { rotate: animations.loader.rotate.interpolate({
                        inputRange: [ 0, 360 ],
                        outputRange: [ '0deg', '360deg' ]
                    })}
                ]
            }} />
        */

