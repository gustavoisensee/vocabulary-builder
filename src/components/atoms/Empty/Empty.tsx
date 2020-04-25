import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import Text from '../Text';
import styles from './styles';

interface eType {
  title: string;
}

const Empty = ({ title }: eType) => (
  <View style={styles.container}>
    <LottieView
      source={require('../../../../assets/empty-state.json')}
      autoPlay
      style={styles.lottie}
    />
    {title && <Text bold>{title}</Text>}
  </View>
);

export default Empty;
