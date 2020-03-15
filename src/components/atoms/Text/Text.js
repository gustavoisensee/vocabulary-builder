import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ bold, children, paddingBottom, style, ...rest }) => {
  const isBold = bold ? { fontWeight: '700' } : {};
  const hasPadding = paddingBottom ? { paddingBottom: 16 } : {};
  return (
    <Text style={[isBold, hasPadding, style, { minHeight: 16 }]} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
