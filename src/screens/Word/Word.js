import React from 'react';
import { View, Text, Button } from 'react-native';

const Word = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Word Screen</Text>
    <Button
      title="Go to Language"
      onPress={() => navigation.navigate('Language')}
    />
  </View>
);

export default Word;
