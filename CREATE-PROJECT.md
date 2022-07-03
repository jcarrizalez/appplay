# Qubit
App IOS and Android: react-native

# Key Build
- esta en el package.json la instruccion y los datos a colocar
- editar 

# Create Proyect
npx react-native init --version="react-native@0.61.2" AppPlay
npx react-native init AppPlay
cp ../AppPlay/android/app/my-release-key.keystore ./android/app
# add SDK android
```
echo 'sdk.dir = /Users/jcarrizalez/Library/Android/sdk' > ./android/local.properties;
```
# config android-assets
```
mkdir android/app/src/main/assets
```

# no requiere configuracion

```
npm install -D prettier;
npm install -D eslint-plugin-prettier;
npm install -D eslint-config-airbnb;
npm install -D eslint-config-prettier;
npm install -D eslint-plugin-import;
npm install -D eslint-plugin-jsx-a11y;
npm install -D eslint-plugin-react;
npm install -D eslint-plugin-react-hooks;
npm install -D babel-plugin-root-import;
npm install -D eslint-import-resolver-babel-plugin-root-import --force;
```


yarn add @react-native-async-storage/async-storage@1.16.1
yarn add @react-native-community/slider@4.2.0
yarn add axios@0.26.0
yarn add styled-components@5.3.3
yarn add redux@4.1.2
yarn add redux-thunk@2.4.1
yarn add react-native-dropdown-picker@5.3.0
yarn add react-native-raw-bottom-sheet@2.2.0
yarn add react-native-tag-group@1.0.2
yarn add react-native-toast-notifications@3.2.3
yarn add react-native-safe-area-context@4.1.0
yarn add react-native-pager-view@5.4.11



```
npm: https://www.npmjs.com/package/prop-types/v/15.8.1
yarn add prop-types@15.8.1


```
npm: https://www.npmjs.com/package/@react-native-async-storage/async-storage/v/1.16.1
yarn add @react-native-async-storage/async-storage@1.16.1
```
```
npm: https://www.npmjs.com/package/@react-native-community/slider/v/4.2.0
yarn add @react-native-community/slider@4.2.0
```
```
npm: https://www.npmjs.com/package/axios/v/0.26.0
yarn add axios@0.26.0
```
```
npm: https://www.npmjs.com/package/styled-components/v/5.3.3
yarn add styled-components@5.3.3
```
```
npm: https://www.npmjs.com/package/redux/v/4.1.2
yarn add redux@4.1.2
```
```
npm: https://www.npmjs.com/package/redux-thunk/v/2.4.1
yarn add redux-thunk@2.4.1
```
```
npm: https://www.npmjs.com/package/react-native-dropdown-picker/v/5.3.0
yarn add react-native-dropdown-picker@5.3.0
```
```
npm: https://www.npmjs.com/package/react-native-raw-bottom-sheet/v/2.2.0
yarn add react-native-raw-bottom-sheet@2.2.0
```
```
npm: https://www.npmjs.com/package/react-native-tag-group/v/1.0.2
yarn add react-native-tag-group@1.0.2
```
```
npm: https://www.npmjs.com/package/react-native-toast-notifications/v/3.2.3
yarn add react-native-toast-notifications@3.2.3
```
```
npm: https://www.npmjs.com/package/react-native-safe-area-context/v/4.1.0
yarn add react-native-safe-area-context@4.1.0
```
```
npm: https://www.npmjs.com/package/react-native-pager-view/v/5.4.11
yarn add react-native-pager-view@5.4.11
```
```
npm: https://www.npmjs.com/package/prop-types/v/15.8.1
yarn add prop-types@15.8.1
```

```
npm https://www.npmjs.com/package/react-native-pulse/v/1.0.7
yarn add react-native-pulse@1.0.7
```



# si requiere configuracion
```
npm: https://www.npmjs.com/package/react-native-screens/v/3.13.1
yarn add react-native-screens@3.13.1
```
```
npm: https://www.npmjs.com/package/react-native-reanimated/v/2.8.0
doc: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/

yarn add react-native-reanimated@2.8.0
```
```
npm: https://www.npmjs.com/package/react-native-linear-gradient/v/2.5.6
yarn add react-native-linear-gradient@2.5.6
```

# no requiere configuracion, pero dependen de las ya configuradas
```
npm: https://www.npmjs.com/package/react-native-gesture-handler/v/2.4.2
yarn add react-native-gesture-handler@2.4.2

solo importar en la proyecto en el componente que use react-native-navigation
import 'react-native-gesture-handler';
```
```
npm: https://www.npmjs.com/package/@react-navigation/drawer/v/6.4.1
yarn add @react-navigation/drawer@6.4.1
```
```
npm: https://www.npmjs.com/package/@react-navigation/native/v/6.0.10
yarn add @react-navigation/native@6.0.10
```
```
npm: https://www.npmjs.com/package/@react-navigation/native-stack/v/6.6.2
yarn add @react-navigation/native-stack@6.6.2
```
```
npm: https://www.npmjs.com/package/@react-navigation/stack/v/6.2.1
yarn add @react-navigation/stack@6.2.1
```


# si requiere configuracion, van de ultimo en la instacion por las pruebas
```
npm: https://www.npmjs.com/package/react-native-google-cast/v/4.2.0
yarn add react-native-google-cast@4.2.0
```
"react-native-google-cast": "^4.2.0",

```
npm: https://www.npmjs.com/package/react-native-orientation-locker/v/1.5.0
yarn add react-native-orientation-locker@1.5.0

Xcode13
en AppPlay -> Signing & Capabilities -> Capability : Access WiFi
```
```
npm: https://www.npmjs.com/package/react-native-vector-icons/v/9.1.0
doc: https://medium.com/@vimniky/how-to-use-vector-icons-in-your-react-native-project-8212ac6a8f06
doc: https://oblador.github.io/react-native-vector-icons/

yarn add react-native-vector-icons@9.1.0;
Xcode13
en AppPlay ->AppPlay : New Group: Fonts

-Busque node_modules/react-native-vector-icons y por la navegacion de carpetas del sistema operativo
-arrastre de la carpeta Fonts(solo las que desee) a su proyecto en Xcode.
MaterialIcons.ttf
-Asegúrese de que su aplicación esté marcada en "Agregar a destinos" y que "Crear grupos" esté marcada si agrega la carpeta completa . ¿No estás familiarizado con Xcode? Prueba este artículo
```

```
npm: https://www.npmjs.com/package/react-native-video/v/5.2.0
yarn add react-native-video@5.2.0

en:
node_modules/react-native-video/android-exoplayer/build.gradle 
reemplazar 2.13.2 a esto 2.13.3

android/settings.gradle
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android-exoplayer')
```



```
rm -r android/build; 
rm -r android/app/src/release/res;
rm -r android/app/build/intermediates;
watchman watch-del-all;
rm -rf $TMPDIR/react-native-packager-cache-*;
rm -rf $TMPDIR/metro-bundler-cache-*;
npm start -- --reset-cache
```


# npm install
```
npm install \
	react-native-pager-view@5.4.9 \
	react-native-paper@4.11.1 \
	react-native-safe-area-context@3.3.2 \
	react-native-safe-area-view@1.1.1 \
	react-native-screens@3.10.1 \
	react-native-svg@12.1.1 \
	react-native-tab-view@3.1.1 \
	toggle-switch-react-native@3.3.0 \

	@react-navigation/native@6.0.6 \
	@react-navigation/stack@6.0.11 \
	@react-navigation/bottom-tabs@6.0.9 \
	@react-navigation/drawer@6.1.8 \
	@react-navigation/elements@1.2.1 \
	@react-navigation/material-bottom-tabs@6.0.9 \
	@react-navigation/material-top-tabs@6.0.6 \
	@react-navigation/native-stack@6.2.5
```

# add ./android/app/src/debug/AndroidManifest.xml


primera vez y deberia poder levantar el proyecto en limpio
```
yarn start --reset-cache;
cd ios;pod install; cd ../;
npm run android;
npm run ios;
```











```
url: https://www.npmjs.com/package/@react-navigation/native/v/6.0.6

npm install \
	@react-navigation/native@6.0.6 \
	@react-navigation/drawer@6.1.8 \
	@react-navigation/native-stack@6.2.5
	@react-navigation/stack@6.0.11

	revisar si voy a usar esto
	 \
	@react-navigation/bottom-tabs@6.0.9 \
	@react-navigation/elements@1.2.1 \
	@react-navigation/material-bottom-tabs@6.0.9 \
	@react-navigation/material-top-tabs@6.0.6 \
	
```


```
npm: https://www.npmjs.com/package/react-native-dropdownalert/v/4.5.1
npm install react-native-dropdownalert@4.5.1
```

```
npm: https://www.npmjs.com/package/lodash/v/4.17.21
npm install lodash@4.17.21
```



para crear iconos para la app se necesita tener:
```
https://github-com.translate.goog/bamlab/generator-rn-toolbox/blob/master/generators/assets/README.md?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=wapp

brew install imagemagick
yarn global add yo generator-rn-toolbox


yo rn-toolbox:assets --icon ./src/companies/qubit/icon.png --ios
yo rn-toolbox:assets --icon ./src/companies/qubit/icon.png --android


```











android/settings.gradle
android/app/build.gradle
android/app/src/main/java/com/qubit/MainApplication.java
android/app/proguard-rules.pro

revisar https://medium.com/@aras.emami/video-stream-in-react-native-app-7d9f0a611ee6






cp android/settings.gradle configurations
cp android/app/build.gradle configurations
cp android/app/src/debug/AndroidManifest.xml configurations
cp android/app/src/main/java/com/qubit/MainApplication.java configurations
cp android/app/src/main/java/com/qubit/MainActivity.java configurations



//import App from './App';
//import App from './configurations/react-native-google-cast@3.4.1/Test';
//import App from './configurations/react-native-vector-icons@9.0.0/Test';

//import App from './configurations/react-navigation/Test';
//import App from './src/components/Index';



ta bueno revisar 
https://github.com/testshallpass/react-native-dropdownalert

https://github.com/mxck/react-native-material-menu





  "ios": {
    "bundleIdentifier": "your bundle identifier",
    "supportsTablet": true
  }


typeof miFuncion === 'function'
typeof forma === 'string'
typeof tamano === 'number'
typeof hoy === 'object'
typeof noExiste === 'undefined'
!Array.isArray()




rename 


mv android/app/src/debug/java/com/qubit/ android/app/src/debug/java/com/appplay/;
mv android/app/src/main/java/com/qubit/ android/app/src/main/java/com/appplay/;
mv ios/Qubit/ ios/AppPlay/;
mv ios/Qubit.xcodeproj/ ios/AppPlay.xcodeproj/;
mv ios/AppPlay.xcodeproj/xcshareddata/xcschemes/Qubit.xcscheme ios/AppPlay.xcodeproj/xcshareddata/xcschemes/AppPlay.xcscheme;
mv ios/Qubit.xcworkspace/ ios/AppPlay.xcworkspace/;
mv ios/QubitTests/ ios/AppPlayTests/;
mv ios/AppPlayTests/QubitTests.m ios/AppPlayTests/AppPlayTests.m;




add para build en /opt/AppPlay/node_modules/react-native/react.gradle
if (enableHermes) {
    doLast {
      def hermesFlags = hermesFlagsForVariant(variant)
      def hbcTempFile = file("${jsBundleFile}.hbc")
      def moveFunc = { resSuffix ->
        File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
        if (originalDir.exists()) {
          File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
          ant.move(file: originalDir, tofile: destDir);
        }
      }
      moveFunc.curry("ldpi").call()
      moveFunc.curry("mdpi").call()
      moveFunc.curry("hdpi").call()
      moveFunc.curry("xhdpi").call()
      moveFunc.curry("xxhdpi").call()
      moveFunc.curry("xxxhdpi").call()




brew install bundletool
bundletool build-apks --bundle=./android/app/build/outputs/bundle/release/app-release.aab --output=./android/app/build/outputs/bundle/release/app-release.apks
bundletool install-apks --apks=./android/app/build/outputs/bundle/release/app-release.apks




react-native start --port 8084 --reset-cache
react-native run-Android --port 8084
















{
  "name": "AppPlay",
  "version": "0.0.1",
  "private": true,
  "keywords": [],
  "author": "Juan Carrizalez <sitgem@gmail.com>",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "startoriginal": "react-native start",
    "start-test": "rm -r android/build; rm -r android/app/src/release/res; rm -r android/app/build/intermediates; watchman watch-del-all; rm -rf $TMPDIR/react-native-packager-cache-*; rm -rf $TMPDIR/metro-bundler-cache-*;npm start -- --reset-cache",
    "start": "watchman watch-del-all;rm -rf $TMPDIR/react-native-packager-cache-*;rm -rf $TMPDIR/metro-bundler-cache-*;react-native start --reset-cache;",
    "back": "adb shell input keyevent 82",
    "certificado-firebase": "cd android && ./gradlew signingReport && cd ..",
    "clean": "cd android && ./gradlew clean && ./gradlew cleanBuildCache && cd ..",
    "key": "echo 'PW:appplay123, CN=Juan Carrizalez, OU=VOD, O=Qubit, L=Buenos Aires, ST=CABA, C=AR'; keytool -genkey -v -keystore AppPlay.keystore -alias AppPlay -keyalg RSA -keysize 2048 -validity 10000; mv AppPlay.keystore android/app/;",
    "build-debug": "mkdir -p android/app/build/intermediates/res/merged/release/;react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && cd android && ./gradlew assembleDebug && cd ..",
    "build-release-error": "mkdir -p android/app/build/intermediates/res/merged/release/;react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/ && rm -rf android/app/src/main/res/drawable-* && rm -rf android/app/src/main/res/raw/* && cd android && ./gradlew assembleRelease && cd ..",
    "build-release": "                                                                   react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && cd android && ./gradlew assembleRelease && cd ..",
    "uninstall": "cd android && ./gradlew uninstallAll && cd ..",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.16.1",
    "@react-native-community/slider": "^4.2.0",
    "@react-navigation/drawer": "^6.3.1",
    "@react-navigation/native": "^6.0.8",
    "@react-navigation/native-stack": "^6.5.0",
    "@react-navigation/stack": "^6.1.1",
    "axios": "^0.26.0",
    "prop-types": "^15.8.1",
    "react": "17.0.2",
    "react-native": "0.67.3",
    "react-native-dropdown-picker": "^5.3.0",
    "react-native-gesture-handler": "^2.3.0",
    "react-native-google-cast": "^4.2.0",
    "react-native-linear-gradient": "^2.5.6",
    "react-native-orientation-locker": "^1.4.0",
    "react-native-pager-view": "^5.4.11",
    "react-native-raw-bottom-sheet": "^2.2.0",
    "react-native-reanimated": "^2.4.1",
    "react-native-safe-area-context": "^4.1.0",
    "react-native-screens": "^3.13.0",
    "react-native-tag-group": "^1.0.2",
    "react-native-toast-notifications": "^3.2.3",
    "react-native-vector-icons": "^9.1.0",
    "react-native-video": "^5.2.0",
    "redux": "^4.1.2",
    "redux-thunk": "^2.4.1",
    "styled-components": "^5.3.3"
  },
  "devDependencies": {
    "@babel/core": "^7.17.5",
    "@babel/runtime": "^7.17.2",
    "@react-native-community/eslint-config": "^3.0.1",
    "babel-jest": "^27.5.1",
    "babel-plugin-root-import": "^6.6.0",
    "eslint": "^8.10.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-prettier": "^8.4.0",
    "eslint-import-resolver-babel-plugin-root-import": "^1.1.1",
    "eslint-plugin-import": "^2.25.4",
    "eslint-plugin-jsx-a11y": "^6.5.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "^7.29.2",
    "eslint-plugin-react-hooks": "^4.3.0",
    "jest": "^27.5.1",
    "metro-react-native-babel-preset": "^0.69.0",
    "prettier": "^2.5.1",
    "react-test-renderer": "17.0.2"
  },
  "jest": {
    "preset": "react-native"
  }
}


   "react-native": "0.68.2",