/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './src/routes';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

function App():JSX.Element {

  return (
    <NavigationContainer>
    <GluestackUIProvider config={config}>
        <Routes />
    </GluestackUIProvider>
  </NavigationContainer>
  );
}


export default App;
