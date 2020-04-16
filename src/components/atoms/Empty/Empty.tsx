import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import Text from '../Text';

interface eType {
  title: string;
}

const Empty = ({ title }: eType) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <LottieView
      source={require('../../../../assets/empty-state.json')}
      autoPlay
      style={{
        width: 250,
        height: 250
      }}
    />
    {title && <Text bold>{title}</Text>}
  </View>
);

export default Empty;
