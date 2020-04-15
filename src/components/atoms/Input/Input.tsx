import React from 'react';
import { TextInput } from 'react-native';
import { COLORS } from '../../../consts/colors';

interface iType {
  error?: boolean;
  value: string | undefined;
  style?: any;
  onChange(a?: any): any;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const Input = ({ error, value, style, onChange, ...rest }: iType) => {
  const errorStyle = error
    ? {
        borderBottomColor: 'red'
      }
    : {};

  return (
    <TextInput
      style={{
        borderRadius: 3,
        backgroundColor: '#ECECEC',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginVertical: 16,
        color: COLORS.black,
        ...errorStyle,
        ...style
      }}
      onChangeText={(text) => onChange(text)}
      value={value}
      {...rest}
    />
  );
};

export default Input;
