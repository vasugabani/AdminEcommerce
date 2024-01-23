import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './app/route/StackNavigation';
import DrawerNavigation from './app/route/DrawerNavigation';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
}