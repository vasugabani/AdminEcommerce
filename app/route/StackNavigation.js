import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Counter from '../container/Counter';
export default function StackNavigation() {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
        <Stack.Screen name="Counter" component={Counter} 
          options={{headerShown:false}}
        />
      </Stack.Navigator>
  )
}