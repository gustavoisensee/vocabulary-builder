import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface ctType {
  bold?: boolean;
  children: any;
  fontSize?: number;
  paddingBottom?: boolean;
  style?: any;
  numberOfLines?: number;
}

const CustomText = ({
  bold,
  children,
  fontSize = 14,
  paddingBottom,
  style,
  ...rest
}: ctType) => {
  const isBold = bold ? styles.bold : {};
  const hasPadding = paddingBottom ? styles.hasPadding : {};

  return (
    <Text
      style={[styles.text, { fontSize }, isBold, hasPadding, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CustomText;
