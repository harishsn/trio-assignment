import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StatusBar, LogBox, useColorScheme, ActivityIndicator } from 'react-native';
import Navigator from './src/navigation';
import { enableScreens } from 'react-native-screens';
import { RootSiblingParent } from 'react-native-root-siblings';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { ThemeProvider } from './src/context/Theme';
import { AuthProvider } from './src/context/Auth';
enableScreens()

const App = () => {
  const systemTheme = useColorScheme();
  return (
    <>
        <StatusBar barStyle={systemTheme == 'light' ? 'dark-content' : 'light-content'} backgroundColor={systemTheme == 'light' ? '#FFF' : '#000'} />
        <Navigator/>
    </>
  );
};

export default () => {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
}
