import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../../consts/colors';

interface ctType {
  bold?: boolean;
  children: any;
  paddingBottom?: boolean;
  style?: any;
  numberOfLines?: number;
}

const CustomText = ({
  bold,
  children,
  paddingBottom,
  style,
  ...rest
}: ctType) => {
  const isBold = bold ? { fontWeight: '700' } : {};
  const hasPadding = paddingBottom ? { paddingBottom: 16 } : {};
  return (
    <Text
      style={[
        {
          minHeight: 16,
          color: COLORS.black
        },
        isBold,
        hasPadding,
        style
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CustomText;
