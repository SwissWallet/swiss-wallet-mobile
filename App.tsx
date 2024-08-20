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
import { Provider } from 'react-redux';
import store from './src/redux/store';

function App():JSX.Element {

  return (
    <NavigationContainer>
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </GluestackUIProvider>
  </NavigationContainer>
  );
}


export default App;
