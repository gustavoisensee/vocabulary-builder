import React from 'react';
import { View } from 'react-native';

const Wrapper = ({ children, style }) => (
  <View style={[{ padding: 16 }, style]}>
    {children}
  </View>
);

export default Wrapper;
