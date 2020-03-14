import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../helpers/screen';
import Language from '../screens/Language'
import Word from '../screens/LanguageDetails'

const Stack = createStackNavigator();

const Main = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Languages"
      component={Language}
      options={{
        title: 'Languages',
        ...options
      }}
    />
    <Stack.Screen
      name="LanguageDetails"
      component={Word}
      options={({ navigation }) => ({
        title: 'Details',
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

export default Main;
