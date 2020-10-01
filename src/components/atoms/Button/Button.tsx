import React, { FC } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  GestureResponderEvent
} from 'react-native';
import styles from './styles';

interface bType {
  children: any;
  onPress: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<bType> = ({ children, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, style]}
    accessibilityRole='button'
    access
  >
    {children}
  </TouchableOpacity>
);

export default Button;
