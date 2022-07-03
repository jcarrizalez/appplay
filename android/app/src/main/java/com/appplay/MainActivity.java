package com.appplay;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import android.os.Bundle; // <- add this juan: react-native-screens@3.13.1

import android.content.Intent; // <- add this juan: react-native-orientation-locker@1.5.0
import android.content.res.Configuration; // <- add this juan: react-native-orientation-locker@1.5.0

//import android.os.Bundle; // <- add this juan: react-native-google-cast@4.2.4
import androidx.annotation.Nullable; // <- add this juan: react-native-google-cast@4.2.4
import com.google.android.gms.cast.framework.CastContext; // <- add this juan: react-native-google-cast@4.2.4

public class MainActivity extends ReactActivity {

  //INI <- add this juan: react-native-orientation-locker@1.5.0
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
  //FIN <- add this juan: react-native-orientation-locker@1.5.0

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AppPlay";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }

  //INI <- add this juan: react-native-screens@3.13.1
  //INI <- add this juan: react-native-google-cast@4.2.4
  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    //super.onCreate(null);
    super.onCreate(savedInstanceState);

    // lazy load Google Cast context
    CastContext.getSharedInstance(this);
  }
  //FIN <- add this juan: react-native-screens@3.13.1
  //FIN <- add this juan: react-native-google-cast@4.2.4
}
