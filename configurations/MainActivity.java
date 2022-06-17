package com.qubit;

import android.os.Bundle;// <- add this juan
import com.facebook.react.ReactActivity;// <- add this juan
import androidx.annotation.Nullable;// <- add this juan
import com.google.android.gms.cast.framework.CastContext;// <- add this juan


import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Qubit";
  }

  @Override// <- add this juan
  protected void onCreate(@Nullable Bundle savedInstanceState) {// <- add this juan
    super.onCreate(savedInstanceState);// <- add this juan
    // lazy load Google Cast context // <- add this juan
    CastContext.getSharedInstance(this);// <- add this juan
  }// <- add this juan
  
}
