import React from 'react';
import { View, Text, Button } from 'react-native';

const Language = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Language Screen</Text>
    <Button
      title="Go to Word"
      onPress={() => navigation.navigate('Word')}
    />
  </View>
);

export default Language;