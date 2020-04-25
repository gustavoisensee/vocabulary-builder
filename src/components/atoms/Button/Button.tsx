import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

interface bType {
  children: any;
  onPress(): any;
  style?: any;
}

const Button = ({ children, onPress, style }: bType) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    {children}
  </TouchableOpacity>
);

export default Button;
