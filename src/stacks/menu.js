import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../helpers/screen';
import Menu from '../screens/Menu';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Menu">
    <Stack.Screen
      name="Menu"
      component={Menu}
      options={{
        title: 'Menu',
        ...options
      }}
    />
  </Stack.Navigator>
);

export default MainStack;
