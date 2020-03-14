import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import generalStack from './src/stacks/general';
import menuStack from './src/stacks/menu';
import { BUTTON } from './src/consts/colors';

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator tabBarOptions={{
      backgroundColor: 'black',
      activeTintColor: BUTTON.secondary
    }}>
      <Tab.Screen name="Main" component={generalStack} options={{
        tabBarIcon: () => (
          <Image
            source={require('./assets/home.png')}
            fadeDuration={0}
            style={{ width: 20, height: 20 }}
          />
        )
      }} />
      <Tab.Screen name='Menu' component={menuStack} options={{ 
        tabBarIcon: () => (
          <Image
            source={require('./assets/menu.png')}
            fadeDuration={0}
            style={{ width: 20, height: 20 }}
          />
        )
       }} />
    </Tab.Navigator>
  </NavigationContainer>
);


export default App;
