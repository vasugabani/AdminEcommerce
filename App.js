import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './app/route/StackNavigation';
import DrawerNavigation from './app/route/DrawerNavigation';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}