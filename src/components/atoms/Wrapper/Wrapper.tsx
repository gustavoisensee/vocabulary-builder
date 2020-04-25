import React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface wType {
  children: any;
  style?: any;
}

const Wrapper = ({ children, style }: wType) => (
  <View style={[styles.container, style]}>{children}</View>
);

export default Wrapper;
