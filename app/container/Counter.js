import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/action/counter.action'
import { decrementSlice, incrementSlice } from '../redux/slice/counter.slice'

export default function Counter() {

  const dispatch = useDispatch()

  const handleIncrement = () => {
    // dispatch(increment())    (without slice)
    dispatch(incrementSlice())     //(with slice)
  }

  const handleDecrement = () => {
    // dispatch(decrement())    (without slice)
    dispatch(decrementSlice())     //(with slice)
  }

  const countdata = useSelector(state=>state.count)
  console.log(countdata);
  
  return (
    <View>
      <Text>Counter</Text>

      <Button title='+' onPress={handleIncrement}/>

      <Text>{countdata.count}</Text>

      <Button title='-' onPress={handleDecrement}/>
    </View>
  )
}