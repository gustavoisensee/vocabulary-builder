import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import generalStack from './src/stacks/general';
import menuStack from './src/stacks/menu';
import { COLORS } from './src/consts/colors';
import { init as initFirebase } from './src/helpers/firebase';
import HomeIcon from './src/components/atoms/Icon/Home';
import MenuIcon from './src/components/atoms/Icon/Menu';

const Tab = createBottomTabNavigator();

const App = () => {
  const initilize = async () => {
    await initFirebase();
  };

  useEffect(() => {
    initilize();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: COLORS.black,
          activeTintColor: COLORS.secondary
        }}
      >
        <Tab.Screen
          name="Main"
          component={generalStack}
          options={{ tabBarIcon: HomeIcon }}
        />
        <Tab.Screen
          name="Menu"
          component={menuStack}
          options={{ tabBarIcon: MenuIcon }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
