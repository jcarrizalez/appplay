import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'

import config,{configNavigatation} from 'config'
const {colors} = config()

import Login from 'screens/Login'
import Theme from 'screens/Theme'
import Player from 'screens/Player'
import Drawer_ from 'screens/Drawer'
import Search from 'screens/Search'
import Marketing from 'screens/Marketing'
import ProfileList from 'screens/ProfileList'
import ProfileEdit from 'screens/ProfileEdit'
import ChannelDetail from 'screens/ChannelDetail'
import ContentDetail from 'screens/ContentDetail'
import ContentSearch from 'screens/ContentSearch'

const Drawer = createDrawerNavigator()

const Stack = createStackNavigator()
//const Stack = createNativeStackNavigator()

const {
  screenOptions, drawerOptions, drawerContent,
  headerStyleInterpolator, modalIos
} = configNavigatation

const transitionerStyle = {
  backgroundColor: colors.background
}

const option = {
  headerStyleInterpolator, 
  presentation:'transparentModal',
  headerMode: 'float',
  headerShown: false,
}

const options = {
  Marketing:option,
  ContentDetail:option,
  ChannelDetail:option,
  ContentSearch:option,
  Login:option,
  Player:{
    headerShown: false,
  },
  ProfileEdit:option,
  ProfileList:option,
  SearchMarketing:{
    presentation: 'modal',
    headerShown: false,
    ...modalIos,
  },
  Search:{
    presentation: 'transparentModal',
    headerShown: false,
    ...modalIos,
  },
}

function screens()
{
  let data = []
  for (var i=1; i<=100; i++){
    data.push(i)
  }
  return data
}


const StackNavigator = () => (
  <Stack.Navigator 
    transitionerStyle={transitionerStyle}
    initialRouteName='Marketing'
    screenOptions={screenOptions}
    >
    <Stack.Screen 
      name='Player' 
      component={Player} 
      options={{
        headerShown: false,
      }}/>
    <Stack.Screen 
      name='Login' 
      component={Login} 
      options={option}
      />
    <Stack.Screen 
      name='Theme' 
      component={Theme} 
      options={option}
      />
    <Stack.Screen 
      name='ProfileEdit' 
      component={ProfileEdit} 
      options={option}
      />
    <Stack.Screen 
      name='ProfileList' 
      component={ProfileList} 
      options={option}
      />
    <Stack.Screen 
      name='SearchMarketing' 
      component={Search} 
      options={{
        presentation: 'modal',
        headerShown: false,
        ...modalIos,
      }}
      />
    <Stack.Screen 
      name='ChannelDetail' 
      component={ChannelDetail} 
      options={option}
      />
    {screens().map((item, key) =>(
      <React.Fragment key={key}>
        <Stack.Screen
          name={`Search${item}`} 
          component={Search} 
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            ...modalIos,
          }}
          />
        <Stack.Screen
          name={`ContentDetail${item}`} 
          component={ContentDetail} 
          options={option}
          />
        <Stack.Screen
          name={`ContentSearch${item}`} 
          component={ContentSearch}
          options={option}
          />
      </React.Fragment>
      ))}
    <Stack.Screen 
      name='Marketing' 
      component={Marketing} 
      options={option}
      />
  </Stack.Navigator>
)

const DrawerNavigator = () => (
  <Drawer.Navigator
    transitionerStyle={transitionerStyle}
    initialRouteName='StackNavigator' 
    screenOptions={drawerOptions}
    drawerContent={ prop => <Drawer_ {...drawerContent(prop)}/>}
    >
    <Drawer.Screen name="StackNavigator" component={StackNavigator} />
  </Drawer.Navigator>
)

export default () =>(
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
)