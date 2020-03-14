import React from 'react';
import { View } from 'react-native';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';

const LanguageDetails = ({ navigation, route }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text bold>Title</Text>
    <Text>{route.params.item.title}</Text>

    <Button onPress={navigation.goBack}>
      <Text>Go back</Text>
    </Button>
  </View>
);

export default LanguageDetails;
