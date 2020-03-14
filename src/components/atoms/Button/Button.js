import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BUTTON } from '../../../consts/colors';

const Button = ({ children, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={{
    backgroundColor: BUTTON.primary,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    marginVertical: 16,
    ...style
  }}>
    {children}
  </TouchableOpacity>
);

export default Button