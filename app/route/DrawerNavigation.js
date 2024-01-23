import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from './StackNavigation'
export default function DrawerNavigation() {
    const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
        <Drawer.Screen name='Counter' component={StackNavigation} />
    </Drawer.Navigator>
  )
}