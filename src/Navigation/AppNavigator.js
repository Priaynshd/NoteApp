import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Notes from '../Screens/Notes';
import AddNotes from '../Screens/AddNotes';

const Stack=createStackNavigator();

const AppNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Notes' component={Notes} options={{headerShown:false}}/>
        <Stack.Screen name='AddNotes' component={AddNotes} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator