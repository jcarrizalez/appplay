module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // <- add this juan: react-native-reanimated@2.8.0
    [
      'babel-plugin-root-import',
      {
        "paths": [
          {
            "rootPathSuffix": "./app.json",
            "rootPathPrefix": "app"
          },
          {
            "rootPathSuffix": "./src/screens",
            "rootPathPrefix": "screens"
          },
          {
            "rootPathSuffix": "./src/services",
            "rootPathPrefix": "services"
          },
          {
            "rootPathSuffix": "./src/config",
            "rootPathPrefix": "config"
          },
          {
            "rootPathSuffix": "./src",
            "rootPathPrefix": "~/"
          },
          {
            "rootPathSuffix": "./src/routes",
            "rootPathPrefix": "routes"
          },
          {
            "rootPathSuffix": "./src/components",
            "rootPathPrefix": "c/"
          },
          {
            "rootPathSuffix": "./src/assets",
            "rootPathPrefix": "a/"
          },
          {
            "rootPathSuffix": "./src/styles",
            "rootPathPrefix": "s/"
          },
          {
            "rootPathSuffix": "./configurations",
            "rootPathPrefix": "!/"
          },
        ]
      }
    ],
  ],
};
