package com.qubit;

import com.facebook.react.ReactActivity;
import android.os.Bundle; // <- add this juan: react-native-screens@3.13.0

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Qubit";
  }

  //INI <- add this juan: react-native-screens@3.13.0
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  //FIN <- add this juan: react-native-screens@3.13.0
}

