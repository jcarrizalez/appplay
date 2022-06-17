/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import GoogleCast, { CastButton, useRemoteMediaClient } from 'react-native-google-cast'

const App = () => {

  const sessionManager = GoogleCast.getSessionManager()

  const client = useRemoteMediaClient()

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = () =>  {

    //console.log(sessionManager)

    if (client) {
      // Send the media to your Cast device as soon as we connect to a device
      // (though you'll probably want to call this later once user clicks on a video or something)
      client.loadMedia({
        mediaInfo: {
          contentUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
        },
      })
    }

    return 
    GoogleCast.castMedia({
        mediaUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
        imageUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg',
        title: 'Big Buck Bunny',
        subtitle:
          'A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.',
        studio: 'Blender Foundation',
         streamDuration: 596, // seconds
        contentType: 'video/mp4', // Optional, default is "video/mp4"
        playPosition: 10, // seconds
        customData: {
          // Optional, your custom object that will be passed to as customData to reciever
          //customKey: 'customValue',
        },
      })
  }
  useEffect(()=>{
    const listener = GoogleCast.onCastStateChanged((castState) => {
      console.log(castState)
      // 'noDevicesAvailable' | 'notConnected' | 'connecting' | 'connected'
    })

    // when you want to stop listening
    return () => listener.remove()
  },[])
  
  // Connection established
  //GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
  //  onPress()
  //})
  return (
    <SafeAreaView >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            react-native-google-cast@3.4.1
          </Text>

        </View>
        <View style={{}}>
         <CastButton style={{tintColor:'red', width: 54, height: 54 }} />
        </View>
         <View style={{margin:10}}>
          <Button
            onPress={() => onPress()}
            title="Play"
          />
        </View>
         <View style={{margin:10}}>
          <Button
            onPress={() => GoogleCast.stop()}
            title="Stop"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
