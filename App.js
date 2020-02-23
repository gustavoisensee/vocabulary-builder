import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackDashboard from './src/stacks/dashboard';
import StackMenu from './src/stacks/menu';

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={StackDashboard} options={{ showIcon: false }} />
      <Tab.Screen name='Menu' component={StackMenu} options={{ showIcon: false }} />
    </Tab.Navigator>
  </NavigationContainer>
);


export default App;
