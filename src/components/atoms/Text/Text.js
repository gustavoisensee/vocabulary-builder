import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ bold, children }) => {
  const isBold = bold ? { fontWeight: '700' } : {};
  return (
    <Text style={[isBold]}>
      {children}
    </Text>
  );
};

export default CustomText;
