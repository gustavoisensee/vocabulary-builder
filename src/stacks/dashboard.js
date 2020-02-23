import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../helpers/screen';
import Language from '../screens/Language'
import Word from '../screens/Word'

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Language">
    <Stack.Screen
      name="Language"
      component={Language}
      options={{
        title: 'Language',
        ...options
      }}
    />
    <Stack.Screen
      name="Word"
      component={Word}
      options={({ navigation }) => ({
        title: 'Word',
        ...options,
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="Back"
            color="#fff"
          />
        ),
      })}
    />
  </Stack.Navigator>
);

export default MainStack;