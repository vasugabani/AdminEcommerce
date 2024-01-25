import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from './StackNavigation'
import Category from '../container/Category';
import Counter from '../container/Counter';
import SubCategory from '../container/SubCategory';
import Product from '../container/Product';
export default function DrawerNavigation() {
    const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
        <Drawer.Screen name='Counter' component={Counter} />
        <Drawer.Screen name='Category' component={Category} />
        <Drawer.Screen name='SubCategory' component={SubCategory} />
        <Drawer.Screen name='Product' component={Product} />
    </Drawer.Navigator>
  )
}