import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { Platform, useColorScheme, StatusBar } from 'react-native';
import config from 'config'

const {colors, company} = config()

class Helper {
  static dropDown;
  static onClose;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }

  static show(type, title, message) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }

  static setOnClose(onClose) {
    this.onClose = onClose;
  }

  static invokeOnClose() {
    if (typeof this.onClose === 'function') {
      this.onClose();
    }
  }
}

const Component = () => 
  <DropdownAlert
    closeInterval={1000}
    updateStatusBar={false}
    //updateStatusBar={false}
    //successColor='#32A54A'
    //infoColor={colors.primary}
    infoColor={'orange'}
    //warnColor='#cd853f'
    //errorColor='#cc3232'
    contentContainerStyle={{ 
      padding: 10, 
      paddingTop: StatusBar.currentHeight,
      paddingBottom:0,
      flex:1,
      flexDirection: 'row' 
    }}
    ref={ref => Helper.setDropDown(ref)}
    onClose={() => Helper.invokeOnClose()}
  />

export default {
  view:Component, 
  show: (title, message, icon = 'info') => Helper.show(icon, title, message),
  info: (title, message, icon = 'info') => Helper.show(icon, title, message),
  success: (title, message, icon = 'success') => Helper.show(icon, title, message),
  error: (title, message, icon = 'error') => Helper.show(icon, title, message),
  close: () => Helper.invokeOnClose(),
}