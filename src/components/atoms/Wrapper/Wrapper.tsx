import React from 'react';
import { View } from 'react-native';

interface wType {
  children: any;
  style?: any;
}

const Wrapper = ({ children, style }: wType) => (
  <View style={[{ padding: 16 }, style]}>{children}</View>
);

export default Wrapper;
