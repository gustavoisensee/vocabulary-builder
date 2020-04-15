import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../../consts/colors';

interface bType {
  children: any;
  onPress(): any;
  style?: any;
}

const Button = ({ children, onPress, style }: bType) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: COLORS.primary,
      padding: 16,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      marginVertical: 16,
      ...style
    }}
  >
    {children}
  </TouchableOpacity>
);

export default Button;
