import {AppRegistry} from 'react-native';
// import React from 'react';
import App from './src/App';
import {name as appName} from './app.json';
import { NativeBaseProvider } from "native-base";
// import { Provider } from "react-redux";
// import store from "./src/redux/store";

const RNRedux = () => (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  )

AppRegistry.registerComponent(appName, () => RNRedux);
