import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ bold, children, style, ...rest }) => {
  const isBold = bold ? { fontWeight: '700' } : {};
  return (
    <Text style={[isBold, style]} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
