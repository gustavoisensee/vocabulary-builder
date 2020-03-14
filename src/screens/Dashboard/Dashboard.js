import React from 'react';
import { Button, View, Text } from 'react-native';

const Dashboard = ({ navigation }) => (
  <View>
    <Text>Dashboard screen</Text>
    <Button title='Language' onPress={() => navigation.navigate('Language')} />
  </View>
)

export default Dashboard;