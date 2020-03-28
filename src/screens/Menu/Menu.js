import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { storeData, retrieveData } from '../../helpers/asyncStorage';
import googleConfig from '../../../config/google.json';

const Menu = () => {
  const [user, setUser] = useState();

  const handleSignIn = async() => {
    try {
      const account = await Google.logInAsync(googleConfig.signIn);

      storeData('account', account);
      setUser(account.user);
    } catch (err) {
      console.warn('Err:', err);
    }
  };

  const getData = async() => {
    const account = await retrieveData('account');
    setUser(account.user);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Menu Screen</Text>
      {user && <Text>{`${user.givenName} ${user.familyName}`}</Text>}

      <TouchableOpacity
        onPress={handleSignIn}
        style={{ backgroundColor: '#dedede', padding: 16, width: '100%' }}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;